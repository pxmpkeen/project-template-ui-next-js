import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthErrorType = "invalid-token" | "expired-token";

type AuthState = {
    authError?: AuthErrorType;
    handled: boolean;

    setAuthError: (type: AuthErrorType) => void;
    markHandled: () => void;
    reset: () => void;
};

const useAuthStore = create<AuthState>()(
    devtools(
        (set, get) => ({
            authError: undefined,
            handled: false,

            setAuthError: (type) => {
                const { authError, handled } = get();

                if (authError || handled) return;

                set({ authError: type }, false, "auth/setAuthError");
            },

            // Mark the current auth error as handled to prevent repeated redirects
            markHandled: () =>
                set({ handled: true }, false, "auth/markHandled"),

            // Reset the auth state (to be used after sign-in or on sign-out)
            reset: () =>
                set(
                    { authError: undefined, handled: false },
                    false,
                    "auth/reset",
                ),
        }),
        {
            name: "auth-store",
        },
    ),
);

export { useAuthStore };
