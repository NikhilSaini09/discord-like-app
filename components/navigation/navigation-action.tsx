"use client"

import { Plus } from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"
import { useModal } from "@/hooks/use-modal-store"

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Add a Server"
            >
                <button
                    className="group flex items-center"
                    type="button"
                    title="Add a Server"
                    onClick={() => onOpen("createServer")}
                >
                    <div className="flex mx-3 h-[48px] w-[48px] dark:bg-neutral-700 dark:group-hover:bg-emerald-500 rounded-[28px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-emerald-500">
                        <Plus
                            className="group-hover:text-white transition text-emerald-500"
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}