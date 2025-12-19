import type { EndpointGroup } from "./_types";

const ACCESS_TOKEN_KEY = "access_token";

const routes = {
    authError: "/auth-error",
    signIn: "/sign-in",
};

const stores = {
    userStore: "UserStore",
};

const endpoints: { [groupName: string]: EndpointGroup } = {
    user: {
        prefix: "/users",
        paths: {
            getProfile: { method: "GET", path: "/profile" },
        },
    },
};

const errors = {};

export { ACCESS_TOKEN_KEY, routes, stores, endpoints, errors };
