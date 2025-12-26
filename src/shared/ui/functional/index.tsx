import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

import { Toaster } from "../visual";
import { AuthRedirectHandler } from "./_AuthRedirectHandler";
import { QueryProvider } from "./_QueryProvider";

interface ProvidersProps {
    children: ReactNode;
    intl: {
        locale: string;
        messages: AbstractIntlMessages;
    };
}

function Providers({ children, intl }: ProvidersProps) {
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

export { Providers, AuthRedirectHandler };
