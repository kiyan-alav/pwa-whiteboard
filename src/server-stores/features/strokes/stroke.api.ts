import axiosClient from "@/utils/axiosClient";
import { SendStrokeData } from "./stroke.types";

export const getStrokesList = () =>
  axiosClient.get("/api/strokes").then((res) => res.data);

export const sendStroke = (data: SendStrokeData) =>
  axiosClient.post("/api/strokes", data);
