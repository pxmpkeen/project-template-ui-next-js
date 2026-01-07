import {
    type MutationFunction,
    type MutationFunctionContext,
    type QueryFunction,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { type Formats, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
    CallNetworkError,
    clearTokens,
    ExpiredTokenError,
    InvalidTokenError,
    RedirectionTimeoutError,
    useRouter,
} from "@/shared/config";
import { errors, routes } from "./_consts";
import type {
    BranchMessageKeys,
    LeafMessageKeys,
    RelativeLeafKeys,
} from "./_types";

interface MutationProps<TResponse> {
    onSuccess?: (r: TResponse) => void;
    onError?: (error: unknown) => void;
    onMutate?: (
        variables: undefined,
        context: MutationFunctionContext,
    ) => unknown;
    onSettled?: (
        data: TResponse | undefined,
        error: unknown,
        variables: undefined,
        onMutateResult: unknown,
        context: MutationFunctionContext,
    ) => Promise<unknown> | unknown;
}

interface QueryProps<TResponse> {
    onError?: (error: unknown) => void;
    enabled?: boolean;
    select?: (data: TResponse) => TResponse;
}

function useHandleError(externalOnError?: (error: unknown) => void) {
    const router = useRouter();
    const t = useTranslations();

    return (error: unknown) => {
        if (
            error instanceof ExpiredTokenError ||
            error instanceof InvalidTokenError
        ) {
            throw error;
        }

        if (error instanceof CallNetworkError) {
            toast.error(t(errors.NETWORK));
        }

        if (error instanceof RedirectionTimeoutError) {
            router.replace(routes.signIn);
            return;
        }

        if (externalOnError) {
            externalOnError(error);
        }
    };
}

function useMutationInternal<TResponse>({
    mutationKey,
    mutationFn,
    onSuccess,
    onError,
    onMutate,
    onSettled,
    retry,
}: {
    mutationKey?: readonly unknown[];
    mutationFn?: MutationFunction<TResponse, void>;
    retry?: number;
} & MutationProps<TResponse>) {
    const wrappedError = useHandleError(onError);

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError: wrappedError,
        onMutate,
        onSettled,
        retry,
    });
}

function useQueryInternal<TResponse>({
    queryKey,
    queryFn,
    onError,
    retry = false,
    retryDelay = 0,
    staleTime = 0,
    enabled,
    select,
}: {
    queryKey: readonly unknown[];
    queryFn?: QueryFunction<TResponse, readonly unknown[]>;
    retry?: number | boolean;
    retryDelay?: number;
    staleTime?: number;
} & QueryProps<TResponse>) {
    const router = useRouter();
    const t = useTranslations();
    const queryResult = useQuery({
        queryKey,
        queryFn,
        retry,
        retryDelay,
        staleTime,
        enabled,
        select,
    });

    const error: Error | null = queryResult.error;
    if (error) {
        if (error instanceof CallNetworkError) {
            toast.error(t(errors.NETWORK));
        } else if (error instanceof RedirectionTimeoutError) {
            router.replace(routes.signIn);
            clearTokens();
        } else if (onError) {
            onError(error);
        }
    }

    return queryResult;
}

function useTranslationsInternal(): <K extends LeafMessageKeys>(
    key: K,
    values?: Record<string, string | number | Date>,
    formats?: Formats,
) => string;

function useTranslationsInternal<N extends BranchMessageKeys>(
    namespace: N,
): <K extends RelativeLeafKeys<N, LeafMessageKeys>>(
    key: K,
    values?: Record<string, string | number | Date>,
    formats?: Formats,
) => string;

function useTranslationsInternal<N extends BranchMessageKeys>(namespace?: N) {
    const t = useTranslations<BranchMessageKeys>(namespace);

    return (
        key: string,
        values?: Record<string, string | number | Date>,
        formats?: Formats,
    ) => t(key, values, formats);
}

export {
    useMutationInternal as useMutation,
    useQueryInternal as useQuery,
    type MutationProps,
    type QueryProps,
    useTranslationsInternal as useTranslations,
};
