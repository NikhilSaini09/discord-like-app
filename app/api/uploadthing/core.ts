import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new UploadThingError("Unauthorized");
    }
    return { userId: userId };
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl, originalName: file.name };
        }),
    messageFile: f({
            "image": { maxFileSize: "4MB" },
            "video": { maxFileSize: "64MB" },
            // "video/mp4": { maxFileSize: "64MB" },
            // "video/ogg": { maxFileSize: "64MB" },
            // "video/webm": { maxFileSize: "32MB" },
            "audio": { maxFileSize: "8MB" },
            // "audio/mpeg": { maxFileSize: "8MB" },
            // "audio/x-aac": { maxFileSize: "8MB" },
            // "audio/x-wav": { maxFileSize: "8MB" },
            // "audio/webm": { maxFileSize: "8MB" },
            "pdf": { maxFileSize: "16MB" }
        })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl, originalName: file.name };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
