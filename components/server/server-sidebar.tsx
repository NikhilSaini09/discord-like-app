import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType } from "@/lib/generated/prisma";

import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId,
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
        }
    });

    if(!server) {
        return redirect("/");
    }

    const allChannels = server.channels;
    const textChannels  = allChannels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = allChannels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videohannels  = allChannels.filter((channel) => channel.type === ChannelType.VIDEO)

    const allMembers = server.members;
    const members = allMembers.filter((member) => member.profileId !== profile.id)

    const role = allMembers.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />
        </div>
    )
}