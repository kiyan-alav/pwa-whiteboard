import { createStore } from "zustand/vanilla";

interface IPoint {
  x: number;
  y: number;
}

interface IStroke {
  tool: "pen" | "eraser";
  color: string;
  size: number;
  points: IPoint[];
}

export type StrokeState = {
  strokes: IStroke[];
  currentStroke: IStroke | null;
  tool: "pen" | "eraser";
  color: string;
  size: number;
};

export type StrokeActions = {
  setTool: (tool: "pen" | "eraser") => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
};

export type StrokeStore = StrokeState & StrokeActions;

export const defaultStrokeState: StrokeState = {
  strokes: [],
  currentStroke: null,
  tool: "pen",
  color: "#000000",
  size: 3,
};

export const createStrokeStore = (
  initState: StrokeState = defaultStrokeState
) => {
  return createStore<StrokeStore>()((set, get) => ({
    ...initState,

    setTool: (tool) => set({ tool }),
    setColor: (color) => set({ color }),
    setSize: (size) => set({ size }),
  }));
};
