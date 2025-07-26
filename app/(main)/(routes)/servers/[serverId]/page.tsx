import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface ServerIdPageProps {
    params: Promise<{
        serverId: string;
    }>
};

const ServerIdPage = async ({
    params,
}: ServerIdPageProps) => {
    const { serverId } = await params;
    const profile = await currentProfile();
    const { redirectToSignIn } = await auth();

    if(!profile) {
        return redirectToSignIn();
    };

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
        include: {
            channels: {
                where: {
                    name: "general",
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    const initialChannel = server?.channels[0];

    if(initialChannel?.name !== "general") {
        return null;
    };

    return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
}

export default ServerIdPage;