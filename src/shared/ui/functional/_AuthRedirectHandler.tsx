"use client";

import { routes } from "@shared/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/config";

export function AuthRedirectHandler() {
    const router = useRouter();
    const { authError, handled, markHandled } = useAuthStore();

    useEffect(() => {
        if (!authError || handled) return;

        markHandled();

        if (authError === "invalid-token") {
            router.replace(routes.signIn);
        }

        if (authError === "expired-token") {
            router.replace(routes.authError);
        }
    }, [authError, handled, router.replace, markHandled]);

    return null;
}
