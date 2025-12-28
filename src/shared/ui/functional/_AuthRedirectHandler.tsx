"use client";

import { useAuthStore, useRouter } from "@shared/config";
import { routes } from "@shared/lib";
import { useEffect } from "react";

export function AuthRedirectHandler() {
    const router = useRouter();
    const { authError, handled, markHandled } = useAuthStore();

    useEffect(() => {
        if (!authError || handled) return;

        markHandled();
        useAuthStore.getState().startRedirect();

        if (authError === "invalid-token") {
            router.replace(routes.signIn);
        } else if (authError === "expired-token") {
            router.replace(routes.authError);
        }
    }, [authError, router, handled, markHandled]);

    return null;
}
