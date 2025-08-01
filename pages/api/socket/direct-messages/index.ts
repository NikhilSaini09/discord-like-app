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
        const { conversationId } = req.query;
        const fileUrl = file?.url;
        const content2 = file?.originalName;

        if(!profile) {
            return res.status(401).json({ error: "Unauthorized" });
        };

        if(!conversationId) {
            return res.status(400).json({ error: "Conversation ID Missing" });
        };
        
        const finalContent = content2 || content;

        if(!finalContent) {
            return res.status(400).json({ error: "Content Missing" });
        };

        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne: {
                            profileId: profile.id,
                        },
                    },
                    {
                        memberTwo: {
                            profileId: profile.id,
                        },
                    },
                ],
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        if(!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        };

        const member = conversation.memberOne.profileId === profile.id ?
                        conversation.memberOne : conversation.memberTwo;

        if(!member) {
            return res.status(404).json({ error: "Member not found" });
        };

        const directMessage = await db.directMessage.create({
            data: {
                content: finalContent,
                fileUrl,
                conversationId: conversationId as string,
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

        const channelKey = `chat:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (error) {
        console.log("[DIRECT_MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    };
};