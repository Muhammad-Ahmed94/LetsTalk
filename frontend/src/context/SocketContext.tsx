import { type ReactNode,useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import io, { Socket } from "socket.io-client";

import useUserStore from "../stores/useUserStore";
import type { SocketContextType } from "../types/types";

// Context
export const SocketContext = createContext<SocketContextType | null>(null);

// use context
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Use socket context musb be within provider");
  }

  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    let newSocket: Socket | null = null;

    if (user) {
      const socketURL = import.meta.env.PROD
        ? window.location.origin
        : "http://localhost:5000";

        console.log("connecting to scoket server", socketURL);

      newSocket = io(socketURL, {
        query: {
          userId: user._id,
        },
        transports: ["websocket", "polling"],
        timeout: 20000, // timeout connection
        forceNew: true // force new connection
      });
      setSocket(newSocket);

      // listen for online users
      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Reconnection attempts
      newSocket.on("reconnect", (attemptNumber) => {
        console.log("🔄 Reconnected to socket server, attempt:", attemptNumber);
      });
      
    } else {
      // user logged out - disconnect socket
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]);
      }
    }

    return () => {
      if (newSocket) {
        // cleanign socket connection
        newSocket.close();
        setSocket(null);
        setOnlineUsers([]);
      }
    };
  }, [user]);

  // Context provider
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
