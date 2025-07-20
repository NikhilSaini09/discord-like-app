import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const initialProfile = async () => {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const user = await currentUser();
    if (!user) return redirectToSignIn();

    const profile = await db.profile.upsert({
        where: { userId },
        update: {},
        create: {
            userId,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            imageUrl: user.imageUrl ?? "",
            email: user.emailAddresses?.[0]?.emailAddress ?? "",
        },
    });

    return profile;
};