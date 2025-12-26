import cnx from "classnames/bind";
import { type ClassValue, clsx } from "clsx";
import {
    type ComponentPropsWithoutRef,
    type ComponentPropsWithRef,
    type ComponentRef,
    createElement,
    type ElementType,
    forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

import { type Endpoint, endpoints } from "./_consts";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function makeCn(styles: Record<string, string>) {
    return cnx.bind(styles);
}

function downloadFile(
    fileBlob: Blob,
    fileName = process.env.NEXT_PUBLIC_DEFAULT_FILE_NAME || "download",
): void {
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");

    try {
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
    } finally {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function resolveEndpoint<T extends Endpoint>(
    endpoint: T,
): T & { path: string } {
    for (const group of Object.values(endpoints)) {
        for (const ep of Object.values(group.paths)) {
            if (ep === endpoint)
                return { ...endpoint, path: group.prefix + endpoint.path };
        }
    }

    return endpoint as T & { path: string };
}

function patchQuery(
    pathname: string,
    currentParams: URLSearchParams,
    nextParams?: Record<string, string | number | boolean | null | undefined>,
) {
    const params = new URLSearchParams(currentParams);

    if (nextParams) {
        Object.entries(nextParams).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
}

type PropsOf<C extends ElementType> = ComponentPropsWithoutRef<C>;
type RefOf<C extends ElementType> = ComponentRef<C>;

/**
 * Overrides selected props of a component with *narrower* types.
 * `O` is restricted to existing keys and must be assignable to the original prop types.
 */
type OverrideProps<P, O extends Partial<{ [K in keyof P]: P[K] }>> = Omit<
    P,
    keyof O
> &
    O;

/**
 * Constrain a component’s props type while preserving `ref` forwarding.
 *
 * Useful for creating “typed specializations” of existing components
 * (including intrinsic HTML tags) without changing their runtime behavior.
 *
 * @param Component - A React component or intrinsic tag name (e.g. `"button"`).
 *
 * @example Intrinsic element
 * ```tsx
 * const Button = constrainPropsType<"button", { variant?: "primary" | "secondary" }>("button");
 *
 * <Button variant="primary" />
 * ```
 *
 * @example React component
 * ```tsx
 * const TypedSelectItem =
 *   constrainPropsType<typeof SelectItem, { value: "a" | "b" }>(SelectItem);
 *
 * <TypedSelectItem value="a" />
 * ```
 */

function constrainPropsType<
    C extends ElementType,
    O extends Partial<{ [K in keyof PropsOf<C>]: PropsOf<C>[K] }>,
>(Component: C) {
    type P = OverrideProps<PropsOf<C>, O>;

    const Wrapped = forwardRef<RefOf<C>, P>((props, ref) => {
        const elementProps = {
            ...props,
            ref,
        } as ComponentPropsWithRef<C>;
        return createElement(Component, elementProps);
    });

    Wrapped.displayName =
        typeof Component === "string"
            ? `constrained(${Component})`
            : `constrained(${Component.displayName ?? Component.name ?? "Component"})`;

    return Wrapped;
}

export {
    cn,
    makeCn,
    downloadFile,
    resolveEndpoint,
    patchQuery,
    constrainPropsType,
};
