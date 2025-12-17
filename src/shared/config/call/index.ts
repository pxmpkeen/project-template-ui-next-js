import { getAccessToken, ExpiredTokenError } from "@/shared/config";
import { doFetch, RequestOptions, CallError, isErrorPayload, ErrorPayload, isFile, extractFile } from "./lib";

export async function call<TResponse, TBody = unknown>(
	path: string,
	options: RequestOptions<TBody> = {}
): Promise<TResponse> {
	const {
		method = "GET",
		body,
		queryParams,
		pathVars,
		headers = {},
		isAuthenticated = false
	} = options;

	let accessToken: string | undefined = undefined;

	if (isAuthenticated) {
		try {
			accessToken = await getAccessToken();
		} catch (e) {
			// Refreshing logic
			throw e;
		}
	}

	if (pathVars) {
		for (const [key, value] of Object.entries(pathVars)) {
			path = path.replace(`:${ key }`, encodeURIComponent(String(value)));
		}
	}

	let uri = process.env.NEXT_PUBLIC_API_URI + path;

	if (queryParams) {
		const queryString = new URLSearchParams(
			Object.entries(queryParams)
				.filter(([, value]) => value !== undefined)
				.map(([k, v]) => [k, String(v)])
		).toString();
		if (queryString) {
			uri += `?${ queryString }`;
		}
	}

	const response = await doFetch(method, headers, body, uri, accessToken);

	if (!response.ok) {
		const contentType = response.headers.get("Content-Type") || "";

		let errorPayload: unknown = null;

		try {
			if (contentType.includes("application/json")) {
				errorPayload = await response.json();
			} else {
				errorPayload = await response.text();
			}
		} catch {
		}

		if (response.status === 401 && isAuthenticated) {
			throw new ExpiredTokenError();
		}

		throw new CallError(
			`Fetch failed with status ${ response.status }`,
			response.status,
			isErrorPayload(errorPayload) ? errorPayload as ErrorPayload : undefined
		);
	}

	const disposition = response.headers.get("Content-Disposition") || "";
	const contentType = response.headers.get("Content-Type") || "";

	if (isFile(disposition, contentType)) return await extractFile(response, disposition)

	if (contentType.includes("application/json")) return ( await response.json() ) as TResponse;

	return ( await response.text() ) as TResponse;
}

export { type FileResponse, CallError, parseToFormData, getErrorDetail } from "./lib";
