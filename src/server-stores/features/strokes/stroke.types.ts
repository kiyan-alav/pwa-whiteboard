interface IPoint {
  x: number;
  y: number;
}

export interface SendStrokeData {
  userId: string;
  tool: "pen" | "eraser";
  color: string;
  size: number;
  points: IPoint[];
}
