class InvalidTokenError extends Error {}
class ExpiredTokenError extends Error {}

interface DecodedToken {
    exp?: number;
}

export { InvalidTokenError, ExpiredTokenError, type DecodedToken };
