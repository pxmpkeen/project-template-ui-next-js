import type {
    ComponentPropsWithoutRef,
    ComponentRef,
    ElementType,
} from "react";
import type { HttpMethod } from "../config";

type Endpoint = { method: HttpMethod; path: string };
type EndpointGroup = {
    prefix: string;
    paths: { [endpointName: string]: Endpoint };
};

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

export type { Endpoint, EndpointGroup, PropsOf, RefOf, OverrideProps };
