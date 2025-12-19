import type { HttpMethod } from "../config";

type Endpoint = { method: HttpMethod; path: string };
type EndpointGroup = {
    prefix: string;
    paths: { [endpointName: string]: Endpoint };
};

export type { Endpoint, EndpointGroup };
