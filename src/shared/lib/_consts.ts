import type { HttpMethod } from "../config";
import type { LeafMessageKeys } from "./_types";

const ACCESS_TOKEN_KEY = "access_token";

/**
 * Application Routes
 * @description Define the main routes used in the application.
 * @example
 * ```tsx
 * const signInRoute = routes.signIn;
 * // signInRoute -> "/sign-in"
 * ```
 */
const routes = {
    authError: "/auth-error",
    signIn: "/sign-in",
};

/**
 * Store Keys
 * @description Define keys for various stores used in the application.
 * @example
 * ```tsx
 * const userStoreKey = stores.userStore;
 * // userStoreKey -> "UserStore"
 * ```
 */

const stores = {
    userStore: "user-store",
    authStore: "auth-store",
};

/**
 * API Endpoints
 * @description Define API endpoints with their HTTP methods and paths.
 * @example
 * ```tsx
 * const path = endpoints.user.paths.getProfile;
 * const endpoint = resolveEndpoint(path); // import { resolveEndpoint } from "./_utils";
 * // endpoint.method -> "GET"
 * // endpoint.path -> "/users/profile"
 * ```
 */
type Endpoint = { method: HttpMethod; path: string; key: string };
type EndpointGroup = {
    prefix: string;
    paths: { [endpointName: string]: Endpoint };
};

const endpoints = {
    user: {
        prefix: "/users",
        paths: {
            getProfile: { method: "GET", path: "/profile", key: "profile" },
        },
    },
} as const satisfies Record<string, EndpointGroup>;

/**
 * Error Messages
 * @description Define common error messages keys used in the application.
 * @example
 * ```tsx
 * const networkError = errors.NETWORK;
 * // networkError -> "A network error occurred. Please try again."
 * ```
 */
const errors = {
    NETWORK: "global.errors.network",
    REQUIRED_EMAIL: "auth.inputs.signIn.email.errors.required",
    INVALID_EMAIL: "auth.inputs.signIn.email.errors.invalid",
    REQUIRED_PASSWORD: "auth.inputs.signIn.password.errors.required",
    PASSWORD_MIN_LENGTH: "auth.inputs.signIn.password.errors.minLength",
    PASSWORD_MAX_LENGTH: "auth.inputs.signIn.password.errors.maxLength",
} as const satisfies Record<string, LeafMessageKeys>;

export { ACCESS_TOKEN_KEY, routes, stores, endpoints, errors, type Endpoint };
