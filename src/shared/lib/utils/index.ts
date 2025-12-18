import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import cnx from "classnames/bind";
import { ExpiredTokenError } from "@/shared/config";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function makeCn(styles: Record<string, string>) {
    return cnx.bind(styles);
}

function downloadFile(fileBlob: Blob, fileName?: string) {
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || process.env.NEXT_PUBLIC_DEFAULT_FILE_NAME || "download";
    a.click();
    URL.revokeObjectURL(url);
}

function withErrorHandler<T>(
    fn: () => Promise<T>,
    handleError: (error: unknown) => void
) {
    return async () => {
        try {
            return await fn();
        } catch (error) {
            handleError(error);
            throw error;
        }
    };
}

function isAuthError(error: unknown) {
    return error instanceof ExpiredTokenError || error instanceof ExpiredTokenError;
}

export { cn, makeCn, downloadFile, withErrorHandler, isAuthError };
