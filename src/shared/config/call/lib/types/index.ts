type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

interface RequestOptions<TBody> {
	method?: HttpMethod;
	body?: TBody;
	queryParams?: Record<string, string | number | boolean | undefined>;
	pathVars?: Record<string, string | number>;
	headers?: HeadersInit;
	isAuthenticated?: boolean;
}

interface FileResponse {
	fileName?: string;
	fileBlob: Blob;
}

interface ErrorPayload {
	detail: string;
}

interface ErrorDetail {
	message?: string;
	code: 'NCE' | 'IP' | 'OK'; // Not call error, Invalid payload, OK
}

class CallError extends Error {
	status: number;
	payload: ErrorPayload | unknown;

	constructor(message: string, status: number, payload?: ErrorPayload) {
		super(message);
		this.status = status;
		this.payload = payload;
	}
}

export type { HttpMethod, RequestOptions, FileResponse, ErrorPayload, ErrorDetail };
export { CallError };
