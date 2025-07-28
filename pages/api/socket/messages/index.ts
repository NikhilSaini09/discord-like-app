import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO,
) {
    if(req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    };

    try {
        const profile = await currentProfilePages(req);
        const { content, file } = req.body;
        const { serverId, channelId } = req.query;
        const fileUrl = file?.url;
        const content2 = file?.originalName;

        if(!profile) {
            return res.status(401).json({ error: "Unauthorized" });
        };

        if(!serverId) {
            return res.status(400).json({ error: "Server ID Missing" });
        };

        if(!channelId) {
            return res.status(400).json({ error: "Channel ID Missing" });
        };
        
        const finalContent = content2 || content;

        if(!finalContent) {
            return res.status(400).json({ error: "Content Missing" });
        };

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        if(!server) {
            return res.status(404).json({ error: "Server not found" });
        };

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            },
        });

        if(!channel) {
            return res.status(404).json({ error: "Channel not found" });
        };

        const member = server.members.find((member) => member.profileId === profile.id);

        if(!member) {
            return res.status(404).json({ error: "Member not found" });
        };

        const message = await db.message.create({
            data: {
                content: finalContent,
                fileUrl,
                channelId: channelId as string,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    };
};