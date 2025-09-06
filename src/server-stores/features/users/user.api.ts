import axiosClient from "@/utils/axiosClient";
import { CreateNewUserData } from "./user.types";

export const createNewUser = (data: CreateNewUserData) => axiosClient.post("/api/register", data)