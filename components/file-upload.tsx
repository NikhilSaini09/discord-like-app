"use client";

import Image from "next/image";
import { FileAudio, FileIcon, FileText, Video, X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileMeta { url?: string, originalName?: string };

interface FileUploadProps {
    onChange: (meta: FileMeta) => void;
    value: string;
    originalName?: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    originalName,
    endpoint
}: FileUploadProps) => {
    const fileType = originalName?.split(".").pop()?.toLowerCase();

    if(value && endpoint === "serverImage") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    sizes="80px"
                    unoptimized  // optional for slow things
                    priority
                    src={value}
                    alt="Uploaded file"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange({ url: "", originalName: "" })}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                    title="Remove attachment"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }
    
    if (value && originalName && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileText
                    className="h-10 w-10 fill-indigo-200 stroke-indigo-400"
                />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 mr-5 text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    PDF Link
                </a>
                <button
                    onClick={() => onChange({ url: "", originalName: "" })}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    title="Remove attachment"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    };

    if (value && originalName && (fileType === "webm" || fileType === "ogg" || fileType === "ogv" || fileType === "mp4"
            || fileType === "m4a" || fileType === "m4v" || fileType === "m4b" || fileType === "m4r"
    )) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <Video
                    className="h-10 w-10 fill-indigo-200 stroke-indigo-400"
                />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 mr-5 text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    Video Link
                </a>
                <button
                    onClick={() => onChange({ url: "", originalName: "" })}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    title="Remove attachment"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    };

    if (value && originalName && (fileType === "wav" || fileType === "aac" || fileType === "mp3")) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileAudio
                    className="h-10 w-10 fill-indigo-200 stroke-indigo-400"
                />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 mr-5 text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    Audio Link
                </a>
                <button
                    onClick={() => onChange({ url: "", originalName: "" })}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    title="Remove attachment"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    };

    if (value && fileType !== "pdf" && fileType !== "webm" && fileType !== "wav" && fileType !== "aac"
            && fileType !== "mp3" && fileType !== "ogg" && fileType !== "ogv" && fileType !== "mp4"
            && fileType !== "m4a" && fileType !== "m4v" && fileType !== "m4b" && fileType !== "m4r"
    ) {
        try {
            return (
                <div className="relative h-20 w-20">
                    <Image
                        fill
                        sizes="80px"
                        unoptimized  // optional for slow things
                        priority
                        src={value}
                        alt="Uploaded file"
                        className="rounded-md"
                    />
                    <button
                        onClick={() => onChange({ url: "", originalName: "" })}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                        title="Remove attachment"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            );
        } catch (error) {
            console.log(error);
        }

        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon
                    className="h-10 w-10 fill-indigo-200 stroke-indigo-400"
                />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm w-auto text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    File Link
                </a>
                <button
                    onClick={() => onChange({ url: "", originalName: "" })}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    title="Remove attachment"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    };

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                // onChange(res?.[0].ufsUrl, res?.[0].name);
                const file = res?.[0];
                if (file) {
                    onChange({ url: file.ufsUrl, originalName: file.name });
                }
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
};