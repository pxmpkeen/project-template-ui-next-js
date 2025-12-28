import { stores } from "@shared/lib";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthErrorType = "invalid-token" | "expired-token";
type AuthState = {
    authError?: AuthErrorType;
    handled: boolean;
    redirecting: boolean;

    setAuthError: (type: AuthErrorType) => void;
    markHandled: () => void;
    startRedirect: () => void;
    finishRedirect: () => void;
    reset: () => void;
};

const useAuthStore = create<AuthState>()(
    devtools(
        (set, get) => ({
            authError: undefined,
            handled: false,
            redirecting: false,

            setAuthError: (type) => {
                const { authError, handled } = get();
                if (authError || handled) return;
                set({ authError: type }, false, "auth/setAuthError");
            },

            markHandled: () =>
                set({ handled: true }, false, "auth/markHandled"),

            startRedirect: () =>
                set({ redirecting: true }, false, "auth/startRedirect"),

            finishRedirect: () =>
                set({ redirecting: false }, false, "auth/finishRedirect"),

            reset: () =>
                set(
                    {
                        authError: undefined,
                        handled: false,
                        redirecting: false,
                    },
                    false,
                    "auth/reset",
                ),
        }),
        { name: stores.authStore },
    ),
);

export { useAuthStore };
