"use client";


import { useEffect } from "react";

import { clearTokens, ExpiredTokenError, InvalidTokenError, useRouter } from "@/shared/config";
import { routes } from "@/shared/lib";

export default function Error(
    { error }:
    { error: Error; }
) {
    const router = useRouter();

    useEffect(() => {
        if (error instanceof InvalidTokenError) {
            // router.replace(routes.signIn);
        } else if (error instanceof ExpiredTokenError) {
            // router.replace(routes.signIn);
            clearTokens();
        }
    }, []);

    return "TEXT_ERROR";
}
