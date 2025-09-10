import mongoose, { Document, Schema, Types } from "mongoose";
require("./User");

interface IPoint {
  x: number;
  y: number;
}

interface IStroke extends Document {
  userId: Types.ObjectId | string;
  tool: "pen" | "eraser";
  color: string;
  size: number;
  points: IPoint[];
}

const StrokeSchema = new Schema<IStroke>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tool: {
      type: String,
      enum: ["pen", "eraser"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    points: [
      {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Stroke =
  mongoose.models.Stroke || mongoose.model<IStroke>("Stroke", StrokeSchema);

export default Stroke;
