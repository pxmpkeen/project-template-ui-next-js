import type { HttpMethod } from "../config";

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
    userStore: "UserStore",
};

/**
 * API Endpoints
 * @description Define API endpoints with their HTTP methods and paths.
 * @example
 * ```tsx
 * const path = endpoints.user.paths.getProfile;
 * const endpoint = resolveEndpoint(path);
 * // endpoint.method -> "GET"
 * // endpoint.path -> "/users/profile"
 * ```
 */
type Endpoint = { method: HttpMethod; path: string };
type EndpointGroup = {
    prefix: string;
    paths: { [endpointName: string]: Endpoint };
};

const endpoints: { [groupName: string]: EndpointGroup } = {
    user: {
        prefix: "/users",
        paths: {
            getProfile: { method: "GET", path: "/profile" },
        },
    },
};

/**
 * Error Messages
 * @description Define common error messages used in the application.
 * @example
 * ```tsx
 * const networkError = errors.get("NETWORK_ERROR");
 * // networkError -> "A network error occurred. Please try again."
 * ```
 */

const errors: Map<string, string> = new Map([
    ["NETWORK_ERROR", "A network error occurred. Please try again."],
    ["UNAUTHORIZED", "You are not authorized to perform this action."],
]);

export { ACCESS_TOKEN_KEY, routes, stores, endpoints, errors, type Endpoint };
