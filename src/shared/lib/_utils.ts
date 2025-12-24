import cnx from "classnames/bind";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { endpoints } from "./_consts";
import type { Endpoint } from "./_types";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function makeCn(styles: Record<string, string>) {
    return cnx.bind(styles);
}

function downloadFile(
    fileBlob: Blob,
    fileName = process.env.NEXT_PUBLIC_DEFAULT_FILE_NAME || "download",
): void {
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");

    try {
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
    } finally {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function resolveEndpoint<T extends Endpoint>(
    endpoint: T,
): T & { path: string } {
    for (const group of Object.values(endpoints)) {
        for (const ep of Object.values(group.paths)) {
            if (ep === endpoint)
                return { ...endpoint, path: group.prefix + endpoint.path };
        }
    }

    return endpoint as T & { path: string };
}

function patchQuery(
    pathname: string,
    currentParams: URLSearchParams,
    nextParams?: Record<string, string | number | boolean | null | undefined>,
) {
    const params = new URLSearchParams(currentParams);

    if (nextParams) {
        Object.entries(nextParams).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
}

export { cn, makeCn, downloadFile, resolveEndpoint, patchQuery };
