import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChatHeader } from "@/components/chat/chat-header";

interface ChannelIdPageProps {
    params: Promise<{
        serverId: string;
        channelId: string;
    }>,
};

const ChannelIdPage = async ({
    params,
}: ChannelIdPageProps) => {
    const { serverId, channelId } = await params;
    const profile = await currentProfile();
    const { redirectToSignIn } = await auth();

    if(!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if(!channel || !member) {
        return redirect("/");
    };

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
        </div>
    );
};

export default ChannelIdPage;