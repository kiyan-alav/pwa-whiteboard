import connectToDB from "../../../../configs/db";
import User from "../../../../models/User";

export async function GET() {
  try {
    await connectToDB();

    const data = await User.find().select("_id firstName lastName email");

    return Response.json(data, { status: 200 });
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
