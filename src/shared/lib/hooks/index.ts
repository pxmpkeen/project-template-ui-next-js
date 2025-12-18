import {
    MutationFunction,
    MutationFunctionContext,
    QueryFunction,
    useMutation,
    useQuery
} from "@tanstack/react-query";

import { ExpiredTokenError, InvalidTokenError } from "@/shared/config";
import { isAuthError } from "../utils";
import { useMemo } from "react";

interface MutationProps<TResponse> {
    onSuccess?: (r: TResponse) => void;
    onError?: (error: unknown) => void;
    onMutate?: ((variables: void, context: MutationFunctionContext) => unknown);
    onSettled?: ((
        data: TResponse | undefined,
        error: unknown,
        variables: void,
        onMutateResult: unknown,
        context: MutationFunctionContext
    ) => Promise<unknown> | unknown);
}

interface QueryProps<TResponse> {
    onError?: (error: unknown) => void;
    enabled?: boolean;
    select?: ((data: TResponse) => TResponse);
}

function useHandleError(
    externalOnError?: (error: unknown) => void
) {
    return (error: unknown) => {
        if (error instanceof ExpiredTokenError || error instanceof InvalidTokenError) {
            throw error;
        }

        if (externalOnError) {
            externalOnError(error);
        }
    };
}

function useMutationInternal<TResponse>(
    { mutationKey, mutationFn, onSuccess, onError, onMutate, onSettled, retry }:
    {
        mutationKey?: readonly unknown[];
        mutationFn?: MutationFunction<TResponse, void>;
        retry?: number;
    } & MutationProps<TResponse>
) {
    const wrappedError = useHandleError(onError);

    return useMutation({ mutationKey, mutationFn, onSuccess, onError: wrappedError, onMutate, onSettled, retry });
}

function useQueryInternal<TResponse>(
    { queryKey, queryFn, onError, retry, retryDelay, staleTime, enabled, select }:
    {
        queryKey: readonly unknown[];
        queryFn?: QueryFunction<TResponse, readonly unknown[]>;
        retry?: number;
        retryDelay?: number;
        staleTime?: number;
    } & QueryProps<TResponse>
) {
    // const options = useMemo(() => ({
    //     queryKey,
    //     queryFn,
    //     retry,
    //     retryDelay,
    //     staleTime,
    //     enabled,
    //     select
    // }), [queryKey, queryFn, retry, retryDelay, staleTime, enabled, select]);

    return useQuery({ queryKey, queryFn, retry: false, retryDelay: 0, staleTime: 0, enabled, select });
}

export { useMutationInternal as useMutation, useQueryInternal as useQuery, type MutationProps, type QueryProps };
