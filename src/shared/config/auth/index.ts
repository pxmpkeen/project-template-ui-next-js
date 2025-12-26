"use client";

import { useRouter } from "@shared/config";
import { jwtDecode } from "jwt-decode";

import { ACCESS_TOKEN_KEY, routes } from "@/shared/lib";
import {
    type DecodedToken,
    ExpiredTokenError,
    InvalidTokenError,
} from "./_utils";

async function getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const tokenValid = isTokenValid(accessToken);

    if (tokenValid === undefined || accessToken === null) {
        throw new InvalidTokenError("Authentication required");
    } else if (!tokenValid) {
        throw new ExpiredTokenError("Token has expired");
    }

    return accessToken;
}

async function checkUserAuthenticated() {
    await getAccessToken();
}

function isTokenValid(token: string | null): boolean | undefined {
    if (!token) return undefined;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (!decoded.exp) return false;

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    } catch {
        return false;
    }
}

function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function isAuthError(error: unknown) {
    return (
        error instanceof ExpiredTokenError || error instanceof InvalidTokenError
    );
}

function useHandleAuthError() {
    const router = useRouter();

    return (error: unknown) => {
        if (error instanceof InvalidTokenError) {
            router.push(routes.signIn);
        } else if (error instanceof ExpiredTokenError) {
            router.push(routes.authError);
        }
    };
}

// TODO: Implement token refresh logic
/**
 * @throws {InvalidTokenError|ExpiredTokenError}
 */
async function refreshToken() {
    return Promise.reject(new InvalidTokenError() || new ExpiredTokenError());
}

export { useAuthStore } from "./_model";
export {
    checkUserAuthenticated,
    getAccessToken,
    clearTokens,
    isAuthError,
    useHandleAuthError,
    refreshToken,
    ExpiredTokenError,
    InvalidTokenError,
};
