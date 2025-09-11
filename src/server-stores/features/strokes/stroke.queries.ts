import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./stroke.api";

import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { SendStrokeData } from "./stroke.types";

export const useStrokes = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const query = useQuery({
    queryKey: ["strokes"],
    queryFn: api.getStrokesList,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    return () => {};
  }, [socket]);

  return query;
};

export const useSendStroke = () => {
  return useMutation({
    mutationFn: (data: SendStrokeData) => api.sendStroke(data),
  });
};
