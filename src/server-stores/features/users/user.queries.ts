import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import * as api from "./user.api";
import { CreateNewUserData, LoginUserData, User } from "./user.types";

export const useCreateNewUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateNewUserData) => api.createNewUser(data),
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.replace("/");
    },
    onError: (error: any) => {
      toast.error(error.data.message);
    },
  });
};

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginUserData) => api.loginUser(data),
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.replace("/board");
    },
    onError: (error: any) => {
      toast.error(error.data.message);
    },
  });
};

export const useGetMeUser = () =>
  useQuery<User>({ queryKey: ["getMe"], queryFn: api.getMe });

let socket: any;

export const useUsers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsersList,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3001", {
        transports: ["websocket"],
      });
    }

    socket.on("users:update", (users: User[]) => {
      queryClient.setQueryData(["users"], users);
    });

    return () => {
      socket?.off("users:update");
    };
  }, [queryClient]);

  return query;
};
