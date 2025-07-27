"use client";

import dynamic from "next/dynamic";

const ClientUserButton = dynamic(
    () => import("@clerk/nextjs").then(mod => mod.UserButton),
    { ssr: false }
);

export default ClientUserButton;