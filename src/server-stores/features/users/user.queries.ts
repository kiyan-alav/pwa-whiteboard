import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "./user.api";

export const useCreateNewUser = () => {
  return useMutation({
    mutationFn: api.createNewUser,
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.data.message);
    },
  });
};
