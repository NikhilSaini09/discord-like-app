"use client";

import {
    createContext, useContext, useEffect, useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const isServerless =
            typeof window !== "undefined" &&
            (window.location.hostname.endsWith("vercel.app") ||
             process.env.NEXT_PUBLIC_DISABLE_SOCKET === "true");

        if (isServerless) {
            // Vercel serverless environments cannot maintain stateful Socket.IO connections.
            // TanStack Query polling (refetchInterval: 1000) handles updates seamlessly without console 404s.
            setIsConnected(false);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin, {
            path: "/api/socket/io",
            addTrailingSlash: false,
            reconnectionAttempts: 3,
            reconnectionDelay: 5000,
            timeout: 5000,
        });

        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        socketInstance.on("connect_error", () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};