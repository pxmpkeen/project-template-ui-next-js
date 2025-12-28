import { getAccessToken, refreshToken } from "../auth";
import { CallError, CallNetworkError, type RequestOptions } from "./_types";
import {
    doFetch,
    extractFile,
    handleRefreshTokenAuthFailure,
    isErrorPayload,
    isFile,
} from "./_utils";

let refreshTokenPromise: Promise<string> | null = null;

async function call<TResponse, TBody = unknown, TError = unknown>(
    path: string,
    options: RequestOptions<TBody, TError> = {},
): Promise<TResponse> {
    const {
        method = "GET",
        body,
        queryParams,
        pathVars,
        headers = {},
        isAuthenticated = false,
        isTError,
    } = options;

    let accessToken: string | undefined;

    if (isAuthenticated) {
        try {
            accessToken = await getAccessToken();
        } catch {
            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshToken().finally(() => {
                    refreshTokenPromise = null;
                });
            }

            try {
                accessToken = await refreshTokenPromise;
            } catch (refreshTokenError) {
                await handleRefreshTokenAuthFailure(refreshTokenError);
            }
        }
    }

    if (pathVars) {
        for (const [key, value] of Object.entries(pathVars)) {
            path = path.replace(`:${key}`, encodeURIComponent(String(value)));
        }
    }

    let uri = process.env.NEXT_PUBLIC_API_URI + path;

    if (queryParams) {
        const queryString = new URLSearchParams(
            Object.entries(queryParams)
                .filter(([, value]) => value !== undefined)
                .map(([k, v]) => [k, String(v)]),
        ).toString();

        if (queryString) uri += `?${queryString}`;
    }

    let response: Response;
    try {
        response = await doFetch(method, headers, body, uri, accessToken);
    } catch (e) {
        throw new CallNetworkError(
            `Network error after token refresh:·${(e as Error).message}`,
        );
    }

    if (response.status === 401 && isAuthenticated) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = refreshToken().finally(() => {
                refreshTokenPromise = null;
            });
        }

        try {
            accessToken = await refreshTokenPromise;
        } catch (refreshError) {
            await handleRefreshTokenAuthFailure(refreshError);
        }
    }

    try {
        response = await doFetch(method, headers, body, uri, accessToken);
    } catch (e) {
        throw new CallNetworkError(
            `Network error after token refresh:·${(e as Error).message}`,
        );
    }

    if (!response.ok) {
        const contentType = response.headers.get("Content-Type") || "";
        let errorPayload: unknown = null;

        try {
            if (contentType.includes("application/json"))
                errorPayload = await response.json();
            else errorPayload = await response.text();
        } catch {}

        throw new CallError<TError>(
            `Fetch failed with status ${response.status}`,
            response.status,
            errorPayload,
            errorPayload
                ? isErrorPayload(errorPayload) || isTError?.(errorPayload)
                    ? "OK"
                    : "IP"
                : undefined,
        );
    }

    const disposition = response.headers.get("Content-Disposition") || "";
    const contentType = response.headers.get("Content-Type") || "";

    if (isFile(disposition, contentType)) {
        return await extractFile(response, disposition);
    }

    if (response.status === 204) {
        return undefined as TResponse;
    }

    if (contentType.includes("application/json")) {
        return (await response.json()) as TResponse;
    }

    return (await response.text()) as TResponse;
}

export {
    CallError,
    CallNetworkError,
    type FileResponse,
    type HttpMethod,
    RedirectionTimeoutError,
} from "./_types";
export { getErrorPayload, parseToFormData } from "./_utils";
export { call };
