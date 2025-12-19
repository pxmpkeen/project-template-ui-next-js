import cnx from "classnames/bind";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    a.download =
        fileName || process.env.NEXT_PUBLIC_DEFAULT_FILE_NAME || "download";
    a.click();
    URL.revokeObjectURL(url);
}

export { cn, makeCn, downloadFile };
