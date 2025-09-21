"use client";
import LeftToolbar from "@/components/common/LeftToolbar";
import TopNavbar from "@/components/common/TopNavbar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSocket } from "@/hooks/useSocket";
import { useStrokeStore } from "@/local-stores/providers/stroke-store-provider";
import {
  useSendStroke,
  useStrokes,
} from "@/server-stores/features/strokes/stroke.queries";
import { SendStrokeData } from "@/server-stores/features/strokes/stroke.types";
import {
  useGetMeUser,
  useUsers,
} from "@/server-stores/features/users/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

function BoardLayout({
  panel,
}: {
  children: React.ReactNode;
  panel: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const currentStroke = useRef<{
    strokeId: string;
    points: { x: number; y: number }[];
    color: string;
    size: number;
    tool: "pen" | "eraser";
  } | null>(null);
  const pendingPoints = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const remoteStrokes = useRef(
    new Map<string, { meta: any; points: { x: number; y: number }[] }>()
  );
  const socket = useSocket();
  const { data: savedStrokes } = useStrokes();
  const { data: me } = useGetMeUser();
  const { data: users } = useUsers();
  const panelSegment = useSelectedLayoutSegment("panel");

  const tool = useStrokeStore((s) => s.tool);
  const color = useStrokeStore((s) => s.color);
  const size = useStrokeStore((s) => s.size);

  const { mutate } = useSendStroke();

  const queryClient = useQueryClient();

  const setupCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctxRef.current = ctx;
    // redraw saved strokes after resize
    redrawAll();
  }, [savedStrokes]);

  const toPixel = (pt: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: pt.x * rect.width, y: pt.y * rect.height };
  };

  const drawSegment = (
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    stroke: { color: string; size: number; tool: "pen" | "eraser" }
  ) => {
    if (!ctx) return;
    if (stroke.tool === "eraser") {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = stroke.size;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawStroke = (stroke: {
    color: string;
    size: number;
    tool: "pen" | "eraser";
    points: { x: number; y: number }[];
  }) => {
    const ctx = ctxRef.current;
    if (!ctx || stroke.points.length < 2) return;
    for (let i = 1; i < stroke.points.length; i++) {
      const p1 = toPixel(stroke.points[i - 1]);
      const p2 = toPixel(stroke.points[i]);
      drawSegment(ctx, p1, p2, {
        color: stroke.color,
        size: stroke.size,
        tool: stroke.tool,
      });
    }
  };

  const redrawAll = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (savedStrokes && Array.isArray(savedStrokes)) {
      for (const s of savedStrokes) {
        drawStroke({
          color: s.color,
          size: s.size,
          tool: s.tool,
          points: s.points,
        });
      }
    }

    remoteStrokes.current.forEach((value) => {
      drawStroke({
        color: value.meta.color,
        size: value.meta.size,
        tool: value.meta.tool,
        points: value.points,
      });
    });

    if (currentStroke.current) {
      drawStroke({
        color: currentStroke.current.color,
        size: currentStroke.current.size,
        tool: currentStroke.current.tool,
        points: currentStroke.current.points,
      });
    }
  };

  const getNormalizedPoint = (evt: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = (evt as any).clientX - rect.left;
    const y = (evt as any).clientY - rect.top;
    return { x: x / rect.width, y: y / rect.height };
  };

  const flushPending = () => {
    if (!pendingPoints.current.length) return;
    const chunk = pendingPoints.current.splice(0, pendingPoints.current.length);
    if (currentStroke.current) {
      const ctx = ctxRef.current;
      if (ctx) {
        const pts = currentStroke.current.points;
        for (
          let i = Math.max(1, pts.length - chunk.length);
          i < pts.length;
          i++
        ) {
          const p1 = toPixel(pts[i - 1]);
          const p2 = toPixel(pts[i]);
          drawSegment(ctx, p1, p2, {
            color: currentStroke.current.color,
            size: currentStroke.current.size,
            tool: currentStroke.current.tool,
          });
        }
      }
    }
    socket?.emit("drawing", {
      strokeId: currentStroke.current!.strokeId,
      points: chunk,
    });
  };

  const scheduleFlush = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      flushPending();
      rafRef.current = null;
    });
  };

  useEffect(() => {
    setupCanvasSize();
    window.addEventListener("resize", setupCanvasSize);
    return () => window.removeEventListener("resize", setupCanvasSize);
  }, [setupCanvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!me) return;
      drawing.current = true;
      const strokeId =
        "s-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      const pt = getNormalizedPoint(e);
      currentStroke.current = { strokeId, points: [pt], color, size, tool };
      pendingPoints.current.push(pt);
      socket?.emit("start-draw", {
        strokeId,
        userId: me._id,
        tool,
        color,
        size,
      });
      scheduleFlush();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drawing.current || !currentStroke.current) return;
      const pt = getNormalizedPoint(e);
      currentStroke.current.points.push(pt);
      pendingPoints.current.push(pt);
      scheduleFlush();
    };

    const onPointerUp = async (e: PointerEvent) => {
      if (!drawing.current || !currentStroke.current) return;
      drawing.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (pendingPoints.current.length) {
        socket?.emit("drawing", {
          strokeId: currentStroke.current.strokeId,
          points: pendingPoints.current.splice(0),
        });
      }
      socket?.emit("end-draw", {
        strokeId: currentStroke.current.strokeId,
        userId: me?._id,
        tool: currentStroke.current.tool,
        color: currentStroke.current.color,
        size: currentStroke.current.size,
        points: currentStroke.current.points,
      });

      try {
        const payload = {
          userId: me?._id,
          tool: currentStroke.current.tool,
          color: currentStroke.current.color,
          size: currentStroke.current.size,
          points: currentStroke.current.points,
        };
        mutate(payload as SendStrokeData);
      } catch (err) {
        console.error("failed saving stroke", err);
      }

      currentStroke.current = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [socket, me, color, size, tool]);

  useEffect(() => {
    redrawAll();
  }, [savedStrokes]);

  useEffect(() => {
    socket?.on("start-draw", (meta) => {
      remoteStrokes.current.set(meta.strokeId, { meta, points: [] });
    });

    socket?.on("drawing", (payload) => {
      const entry = remoteStrokes.current.get(payload.strokeId);
      if (!entry) return;
      entry.points.push(...payload.points);
      const ctx = ctxRef.current;
      if (!ctx) return;
      const pts = entry.points;
      if (pts.length >= 2) {
        const len = pts.length;
        const p1 = toPixel(pts[len - 2]);
        const p2 = toPixel(pts[len - 1]);
        drawSegment(ctx, p1, p2, {
          color: entry.meta.color,
          size: entry.meta.size,
          tool: entry.meta.tool,
        });
      }
    });

    socket?.on("end-draw", (meta) => {
      // finalize remote stroke (already drawn). keep it in remoteStrokes so redrawAll includes it until page reload
      // optionally move to savedStrokes if server saved it, but client fetch will get it on reload
      // nothing else needed
    });

    return () => {
      socket?.off("start-draw");
      socket?.off("drawing");
      socket?.off("end-draw");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleBoardCleared = () => {
      queryClient.setQueryData(["strokes"], []);

      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      remoteStrokes.current.clear();
      currentStroke.current = null;
    };

    socket.on("board-cleared", handleBoardCleared);

    return () => {
      socket.off("board-cleared", handleBoardCleared);
    };
  }, [socket, queryClient]);

  useEffect(() => {
    if (!socket) return;

    socket.on("stroke:saved", (stroke) => {
      queryClient.setQueryData(["strokes"], (old: any) =>
        old ? [...old, stroke] : [stroke]
      );
    });

    return () => {
      socket.off("stroke:saved");
    };
  }, [socket, queryClient]);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden transition-colors">
      {/* Top Navbar */}
      <TopNavbar />

      <div className="flex h-full">
        {/* Left Toolbar */}
        <LeftToolbar />

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/*  Canvas Area */}
          <div className="flex-1 relative bg-white dark:bg-gray-900">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair w-full h-full touch-none"
              width="1200"
              height="800"
              style={{ width: "100%", height: "100%", touchAction: "none" }}
            ></canvas>
          </div>

          {/* Right Panel */}
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-col shadow-sm hidden lg:flex">
            {/* Panel Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <Link
                href="/board/chat"
                className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                  panelSegment === "chat" ? "border-b-2 border-primary" : ""
                }`}
                // onclick="switchTab('chat')"
              >
                Chat
              </Link>
              <Link
                href="/board/users"
                className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                  panelSegment === "users" ? "border-b-2 border-primary" : ""
                }`}
                // onclick="switchTab('users')"
              >
                Users ({users?.length})
              </Link>
            </div>
            {panel}
          </div>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-8 mr-4 mt-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="block lg:hidden bg-white dark:bg-gray-800">
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <div className="w-full h-full border-l border-gray-200 dark:border-gray-700 flex-col shadow-sm flex">
                {/* Panel Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <Link
                    href="/board/chat"
                    className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                      panelSegment === "chat" ? "border-b-2 border-primary" : ""
                    }`}
                    // onclick="switchTab('chat')"
                  >
                    Chat
                  </Link>
                  <Link
                    href="/board/users"
                    className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                      panelSegment === "users"
                        ? "border-b-2 border-primary"
                        : ""
                    }`}
                    // onclick="switchTab('users')"
                  >
                    Users ({users?.length})
                  </Link>
                </div>
                {panel}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </main>
  );
}

export default BoardLayout;
