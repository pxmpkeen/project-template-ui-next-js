import type { AuthErrorType } from "./_model";

class InvalidTokenError extends Error {
    readonly type: AuthErrorType = "invalid-token";

    constructor(message?: string) {
        super(message ?? "Invalid token");
        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}

class ExpiredTokenError extends Error {
    readonly type: AuthErrorType = "expired-token";

    constructor(message?: string) {
        super(message ?? "Expired token");
        Object.setPrototypeOf(this, ExpiredTokenError.prototype);
    }
}

interface DecodedToken {
    exp?: number;
}

export { InvalidTokenError, ExpiredTokenError, type DecodedToken };
