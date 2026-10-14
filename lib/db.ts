import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    const client = new PrismaClient();
    return client.$extends({
        query: {
            $allModels: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async $allOperations({ args, query }: any) {
                    try {
                        return await query(args);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                        const isConnectionError =
                            error?.code === "P1001" ||
                            error?.name === "PrismaClientInitializationError" ||
                            error?.message?.includes("Can't reach database server");

                        if (isConnectionError) {
                            // Wait 1.5 seconds for TiDB Cloud cluster to wake from idle and retry
                            await new Promise((resolve) => setTimeout(resolve, 1500));
                            return await query(args);
                        }
                        throw error;
                    }
                },
            },
        },
    });
};

type PrismaClientWithExtensions = ReturnType<typeof prismaClientSingleton>;

declare global {
    var prisma: PrismaClientWithExtensions | undefined;
}

export const db = globalThis.prisma || prismaClientSingleton();

globalThis.prisma = db;