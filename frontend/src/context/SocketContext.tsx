import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import io, { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

import type { ReactNode } from "react";
import useUserStore from "../stores/useUserStore";

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useUserStore();

    useEffect(() => {
        if(user) {
            const socket = io("http://localhost:5000");
            setSocket(socket);

            return () => socket.close()
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            } 
        }
    }, [])

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};