import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return null;
    }

    return await db.profile.findUnique({
        where: {
            userId,
        }
    });  // profile
}