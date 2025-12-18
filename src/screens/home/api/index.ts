"use client";


import { useQuery as useExternalQuery } from "@tanstack/react-query";

import { useQuery as useInternalQuery } from "@/shared/lib";
import { ExpiredTokenError } from "@/shared/config";

export function useQuery() {
    console.log("Query usage");
    return useExternalQuery({
        queryKey: ['q'],
        queryFn: () => {
            return Promise.resolve();
        }
    });
}
