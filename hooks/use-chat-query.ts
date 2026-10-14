import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query"

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialMessages?: any[];
};

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
    initialMessages,
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            },
        }, { skipNull: true });

        const res = await fetch(url);
        return res.json();
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        structuralSharing: false,
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
        initialData: initialMessages !== undefined ? {
            pages: [{
                items: initialMessages,
                nextCursor: initialMessages.length === 10 ? initialMessages[initialMessages.length - 1].id : null,
            }],
            pageParams: [undefined],
        } : undefined,
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
};