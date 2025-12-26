"use client";

import { InvalidTokenError } from "@shared/config";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
            <App />
        </Suspense>
    );
}

function App() {
    const searchParams = useSearchParams();
    if (searchParams.get("lang") === "invalid-token") {
        throw new InvalidTokenError();
    }

    return <div>Message</div>;
}
