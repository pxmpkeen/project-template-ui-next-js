import {
    ExpiredTokenError,
    getAccessToken,
    InvalidTokenError,
    refreshToken,
    useAuthStore,
} from "../auth";
import { CallError, type ErrorPayload, type RequestOptions } from "./_types";
import { doFetch, extractFile, isErrorPayload, isFile } from "./_utils";

let refreshTokenPromise: Promise<string> | null = null;

async function handleRefreshTokenAuthFailure(err: unknown): Promise<never> {
    if (err instanceof InvalidTokenError || err instanceof ExpiredTokenError) {
        const store = useAuthStore.getState();
        store.setAuthError(err.type);

        await new Promise<void>((resolve) => {
            const unsub = useAuthStore.subscribe(
                (
                    state: { redirecting: boolean },
                    prev: { redirecting: boolean },
                ) => {
                    if (!prev.redirecting && state.redirecting) {
                        unsub();
                        resolve();
                    }
                },
            );
        });

        throw err;
    }

    throw err;
}

async function call<TResponse, TBody = unknown>(
    path: string,
    options: RequestOptions<TBody> = {},
): Promise<TResponse> {
    const {
        method = "GET",
        body,
        queryParams,
        pathVars,
        headers = {},
        isAuthenticated = false,
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

    let response = await doFetch(method, headers, body, uri, accessToken);

    if (response.status === 401 && isAuthenticated) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = refreshToken().finally(() => {
                refreshTokenPromise = null;
            });
        }

        try {
            accessToken = await refreshTokenPromise;
            response = await doFetch(method, headers, body, uri, accessToken);
        } catch (refreshError) {
            await handleRefreshTokenAuthFailure(refreshError);
        }
    }

    if (!response.ok) {
        const contentType = response.headers.get("Content-Type") || "";
        let errorPayload: unknown = null;

        try {
            if (contentType.includes("application/json"))
                errorPayload = await response.json();
            else errorPayload = await response.text();
        } catch {}

        throw new CallError(
            `Fetch failed with status ${response.status}`,
            response.status,
            isErrorPayload(errorPayload)
                ? (errorPayload as ErrorPayload)
                : undefined,
        );
    }

    const disposition = response.headers.get("Content-Disposition") || "";
    const contentType = response.headers.get("Content-Type") || "";

    if (isFile(disposition, contentType)) {
        return await extractFile(response, disposition);
    }

    if (contentType.includes("application/json")) {
        return (await response.json()) as TResponse;
    }

    return (await response.text()) as TResponse;
}

export { CallError, type FileResponse, type HttpMethod } from "./_types";
export { getErrorDetail, parseToFormData } from "./_utils";
export { call };
