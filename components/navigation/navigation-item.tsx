"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
    defaultChannelId?: string;
};

export const NavigationItem = ({
    id,
    imageUrl,
    name,
    defaultChannelId,
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const targetUrl = defaultChannelId ? `/servers/${id}/channels/${defaultChannelId}` : `/servers/${id}`;

    const onClick = () => {
        router.push(targetUrl);
    }

    const onMouseEnter = () => {
        router.prefetch(targetUrl);
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                className="group relative flex items-center"
                type="button"
                title="Navigate to server"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-1",
                    params?.serverId !== id && "group-hover:h-5",
                    params?.serverId === id ? "h-9" : "h-2"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-2xl"
                )}>
                    <Image
                        fill
                        sizes="48px"
                        unoptimized
                        priority
                        src={imageUrl}
                        alt="Channel name"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}