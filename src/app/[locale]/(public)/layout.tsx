"use client";

import { AuthRedirectHandler } from "@shared/ui";
import type { ReactNode } from "react";

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <AuthRedirectHandler />
            {children}
        </>
    );
}
