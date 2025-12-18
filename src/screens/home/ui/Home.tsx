"use client";


import { useQuery } from "../api";

export default function Home() {
    console.log("Home page run");
    const { error }  = useQuery()
    if ( error ) {
        console.error("Error in home", error);
    }

    return (
        <>
            TEXT
        </>
    );
}
