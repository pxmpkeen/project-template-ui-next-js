import type az from "@messages/az.json";
import type en from "@messages/en.json";
import type ru from "@messages/ru.json";

// In case you need all keys (both leaf and branch), uncomment this:
/*
type NodeKeys<T, Prefix extends string = ""> =
    | (Prefix extends "" ? never : Prefix)
    | {
    [K in keyof T]: T[K] extends object
        ? NodeKeys<
            T[K],
            `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
        >
        : `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`;
}[keyof T];
 */

type LeafKeys<T, Prefix extends string = ""> = T extends string
    ? Prefix
    : {
          [K in keyof T]: LeafKeys<
              T[K],
              `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
          >;
      }[keyof T];

type BranchKeys<T, Prefix extends string = ""> =
    | (Prefix extends "" ? never : Prefix)
    | {
          [K in keyof T]: T[K] extends object
              ? BranchKeys<
                    T[K],
                    `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
                >
              : never;
      }[keyof T];

type RelativeLeafKeys<
    N extends string,
    All extends string,
> = All extends `${N}.${infer Rest}` ? Rest : never;

type LeafMessageKeys = LeafKeys<typeof az> &
    LeafKeys<typeof ru> &
    LeafKeys<typeof en>;
type BranchMessageKeys = BranchKeys<typeof az> &
    BranchKeys<typeof ru> &
    BranchKeys<typeof en>;

export type { LeafMessageKeys, BranchMessageKeys, RelativeLeafKeys };
