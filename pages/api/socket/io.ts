import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIO } from "@/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if(!res.socket.server.io) {
        const path = "/api/socket/io";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const httpServer: NetServer = res.socket.server as any;  // as unknown as NetServer;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }

    res.end();
}

export default ioHandler;