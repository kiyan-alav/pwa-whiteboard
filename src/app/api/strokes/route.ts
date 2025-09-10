import connectToDB from "@/configs/db";
import Stroke from "@/models/Stroke";

export async function GET() {
  try {
    await connectToDB();
    const strokes = await Stroke.find().sort({ createdAt: 1 }).lean();
    return Response.json(strokes, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { userId, tool, color, size, points } = body;

    if (!userId || !tool || !color || !size || !Array.isArray(points)) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const stroke = await Stroke.create({ userId, tool, color, size, points });
    return Response.json(stroke, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
