import {
    CallError,
    type ErrorDetail,
    type ErrorPayload,
    type HttpMethod,
} from "./_types";

function isErrorPayload(value: unknown): value is ErrorPayload {
    return typeof value === "object" && value !== null && "detail" in value;
}

function getErrorDetail(error: unknown): ErrorDetail {
    if (error instanceof CallError) {
        if (isErrorPayload(error.payload)) {
            return { message: error.payload.detail, code: "OK" };
        } else {
            return { code: "IP" };
        }
    }
    return { code: "NCE" };
}

async function doFetch<TBody>(
    method: HttpMethod,
    headers: HeadersInit,
    body: TBody,
    uri: string,
    accessToken: string | undefined,
): Promise<Response> {
    const fetchOptions: RequestInit = {
        method,
        headers: {
            ...headers,
        },
        credentials: "include",
    };
    if (!(body instanceof FormData)) {
        fetchOptions.headers = {
            "Content-Type": "application/json",
            ...fetchOptions.headers,
        };
    }

    if (accessToken) {
        fetchOptions.headers = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }

    if (body && method !== "GET") {
        fetchOptions.body =
            body instanceof FormData ? body : JSON.stringify(body);
    }

    return fetch(uri, fetchOptions);
}

function parseToFormData(object: object): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(object)) {
        if (value instanceof File) {
            formData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item instanceof File) {
                    formData.append(`${key}`, item, item.name);
                } else if (typeof item === "object" && item !== null) {
                    formData.append(`${key}`, JSON.stringify(item));
                } else {
                    formData.append(`${key}`, String(item));
                }
            });
        } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    }

    return formData;
}

const isFile = (disposition: string, contentType: string) =>
    disposition.includes("attachment") ||
    contentType.includes("application/octet-stream") ||
    contentType.includes("application/pdf") ||
    contentType.includes("application/vnd");

async function extractFile<TResponse>(response: Response, disposition: string) {
    const blob = await response.blob();

    let filename: string | undefined;

    if (disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "").trim();
    }

    return {
        fileBlob: blob,
        fileName: filename,
    } as TResponse;
}

export {
    isFile,
    isErrorPayload,
    getErrorDetail,
    doFetch,
    parseToFormData,
    extractFile,
};
