import { errors } from "./_consts";
import type { LeafMessageKeys } from "./_types";

const errorKeys = Object.values(errors) as LeafMessageKeys[];

function isErrorMessageKey(value: unknown): value is LeafMessageKeys {
    return (
        typeof value === "string" &&
        errorKeys.includes(value as LeafMessageKeys)
    );
}

export { isErrorMessageKey };
