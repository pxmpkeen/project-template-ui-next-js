"use client";


import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: ReactNode }) {
	const retryValue = process.env.NEXT_PUBLIC_REACT_QUERY_RETRY;
	const staleTimeValue = process.env.NEXT_PUBLIC_REACT_QUERY_STALE_TIME;
	const retry = retryValue ? parseInt(retryValue, 10) : 2;
	const staleTime =  staleTimeValue ? parseInt(staleTimeValue, 10) : 5 * 60 * 1000;


	const [queryClient] = useState(() => new QueryClient(
		{ defaultOptions: { queries: { retry, staleTime } } }
	));

	return (
		<QueryClientProvider client={ queryClient }>
			{ children }
		</QueryClientProvider>
	);
}
