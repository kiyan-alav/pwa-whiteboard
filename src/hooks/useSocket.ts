"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket(userId?: string) {
  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("http://localhost:3001", {
        transports: ["websocket"],
      });
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
      socket?.emit("register", userId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [userId]);

  return socket;
}
