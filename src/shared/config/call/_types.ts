type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS";

interface RequestOptions<TBody, TError> {
    method?: HttpMethod;
    body?: TBody;
    queryParams?: Record<string, string | number | boolean | undefined>;
    pathVars?: Record<string, string | number>;
    headers?: HeadersInit;
    isAuthenticated?: boolean;
    isTError?: (value: unknown) => value is TError;
}

interface FileResponse {
    fileName?: string;
    fileBlob: Blob;
}

interface ErrorPayload {
    detail: string;
}

type ErrorPayloadCode = "IP" | "OK"; // Invalid payload, OK

class CallError<TError> extends Error {
    status: number;
    payload: ErrorPayload | TError | unknown;
    errorPayloadCode?: ErrorPayloadCode;

    constructor(
        message: string,
        status: number,
        payload?: unknown,
        errorPayloadCode?: ErrorPayloadCode,
    ) {
        super(message);
        this.status = status;
        this.payload = payload;
        this.errorPayloadCode = errorPayloadCode;
        this.name = "CallError";
    }
}

class RedirectionTimeoutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RedirectionTimeoutError";
    }
}

class CallNetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CallNetworkError";
    }
}

export type {
    HttpMethod,
    RequestOptions,
    FileResponse,
    ErrorPayload,
    ErrorPayloadCode,
};
export { CallError, RedirectionTimeoutError, CallNetworkError };
