import axiosClient from "@/utils/axiosClient";
import { CreateNewUserData, LoginUserData } from "./user.types";

export const createNewUser = (data: CreateNewUserData) =>
  axiosClient.post("/api/register", data);

export const loginUser = (data: LoginUserData) =>
  axiosClient.post("/api/login", data);

export const getMe = () =>
  axiosClient.get("/api/me").then((res) => res.data.data);

export const getUsersList = () =>
  axiosClient.get("/api/users").then((res) => res.data);
