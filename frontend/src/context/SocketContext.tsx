import { useContext, useEffect, type ReactNode } from "react";
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

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    let newSocket: Socket | null = null;

    if (user) {
      newSocket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });
      setSocket(newSocket);

      // listen for online users
      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users)
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        setSocket(null);
      }
    };
  }, [user]);

  // Context provider
  return(
    <SocketContext.Provider value={{socket ,onlineUsers}}>
        {children}
    </SocketContext.Provider>
  )
};
