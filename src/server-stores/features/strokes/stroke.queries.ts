import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./stroke.api";

import { useEffect } from "react";
import { SendStrokeData } from "./stroke.types";

let socket: any;

export const useStrokes = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["strokes"],
    queryFn: api.getStrokesList,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("stroke:saved", (stroke: SendStrokeData) => {
      queryClient.setQueryData(["strokes"], (old: any) => {
        console.log("old strokes =>", old);

        if (!old) return [stroke];

        if (Array.isArray(old)) {
          return [...old, stroke];
        }

        if (old?.data) {
          return { ...old, data: [...old.data, stroke] };
        }

        return old;
      });
    });

    return () => {
      socket.off("stroke:saved");
    };
  }, [queryClient]);

  return query;
};

export const useSendStroke = () => {
  return useMutation({
    mutationFn: (data: SendStrokeData) => api.sendStroke(data),
  });
};
