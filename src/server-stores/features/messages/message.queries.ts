import { useSocket } from "@/hooks/useSocket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import * as api from "./message.api";
import { Message, SendMessagePayload } from "./message.types";

let socket: any;

export const useMessages = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: api.getMessagesList,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3001", {
        transports: ["websocket"],
      });
    }

    socket.on("new-message", (msg: Message) => {
      queryClient.setQueryData<Message[]>(["messages"], (old = []) => [
        ...old,
        msg,
      ]);
    });

    return () => {
      socket?.off("new-message");
    };
  }, [queryClient]);

  return query;
};

export const useSendMessage = () => {
  const socket = useSocket();

  const sendMessage = ({ userId, message }: SendMessagePayload) => {
    if (!socket) return;
    socket.emit("send-message", { userId, message });
  };

  return { sendMessage };
};
