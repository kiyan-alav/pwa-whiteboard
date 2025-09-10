import axiosClient from "@/utils/axiosClient";

export const getStrokesList = () =>
  axiosClient.get("/api/strokes").then((res) => res.data);
