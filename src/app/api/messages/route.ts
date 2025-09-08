import connectToDB from "@/configs/db";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectToDB();
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .populate("sender");

    return Response.json(messages, { status: 200 });
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
