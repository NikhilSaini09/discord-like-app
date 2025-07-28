"use client";

import {
    Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";

import dynamic from "next/dynamic";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { EmojiStyle, SkinTones, Theme, SuggestionMode } from "emoji-picker-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";

interface EmojiPickerProps {
    onChange: (value: string) => void;
};

export const EmojiPicker = ({
    onChange,
}: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();
    const theme: Theme = resolvedTheme === "light" ? Theme.LIGHT
            : resolvedTheme === "auto" ? Theme.AUTO : Theme.DARK;
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
            >
                {/* <Picker
                    theme={resolvedTheme}
                    data={data}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                /> */}

                <Picker
                    onEmojiClick={({ emoji }) => onChange(emoji)}
                    emojiStyle={EmojiStyle.GOOGLE}        // or GOOGLE, TWITTER, FACEBOOK, NATIVE, APPLE
                    theme={theme}
                    defaultSkinTone={SkinTones.MEDIUM}
                    suggestedEmojisMode={SuggestionMode.RECENT}
                    autoFocusSearch={true}
                    lazyLoadEmojis={true}
                />
            </PopoverContent>
        </Popover>
    );
};
