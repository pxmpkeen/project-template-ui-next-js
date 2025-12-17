import { defineRouting } from 'next-intl/routing';

const locales = JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || "[]") as string[];
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export const routing = defineRouting({ locales, defaultLocale });
