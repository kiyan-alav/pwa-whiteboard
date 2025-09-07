import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: api.getUsersList,
    refetchInterval: 5000,
  });
