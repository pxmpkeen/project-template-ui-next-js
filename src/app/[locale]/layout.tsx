import { Montserrat } from "next/font/google";
import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { routing } from "@/shared/config";
import { QueryProvider } from "@/shared/ui";
import "../globals.css";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
    return (await import(`@messages/${locale}.json`)).default;
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale)) {
        redirect(routing.defaultLocale);
    }

    setRequestLocale(locale);

    const messages = await getMessages(locale);

    return (
        <html lang={locale}>
            <body className={`${montserrat.variable} antialiased`}>
                <QueryProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
