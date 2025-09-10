import axiosClient from "@/utils/axiosClient";

export const getMessagesList = () =>
  axiosClient.get("/api/messages").then((res) => res.data);
