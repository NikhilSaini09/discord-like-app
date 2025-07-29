import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Member, Message, Profile } from "@/lib/generated/prisma";

import { useSocket } from "@/components/providers/socket-provider";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    }
};

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        items: page.items.map((item: MessageWithMemberWithProfile) => {
                            if(item.id === message.id) {
                                return message;
                            }
                            return item;
                        }),
                    };
                });

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message],
                        }]
                    };
                }

                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items,
                    ]
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [socket, addKey, updateKey, queryClient, queryKey]);
};