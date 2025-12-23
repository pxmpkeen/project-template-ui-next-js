import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

import { Toaster } from "../visual";
import { QueryProvider } from "./_QueryProvider";

interface ProvidersProps {
    children: ReactNode;
    intl: {
        locale: string;
        messages: AbstractIntlMessages;
    };
}

export function Providers({ children, intl }: ProvidersProps) {
    return (
        <QueryProvider>
            <NextIntlClientProvider
                locale={intl.locale}
                messages={intl.messages}
            >
                <Toaster />
                {children}
            </NextIntlClientProvider>
        </QueryProvider>
    );
}
