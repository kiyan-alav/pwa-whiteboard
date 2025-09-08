import { generateAccessToken, verifyPassword } from "@/utils/auth";
import connectToDB from "@/configs/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      existingUser.password
    );

    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "Wrong email or password" },
        { status: 400 }
      );
    }

    const accessToken = generateAccessToken({
      id: existingUser._id,
    });

    const response = Response.json(
      {
        message: "Login successfully!",
      },
      {
        status: 200,
      }
    );

    response.headers.append(
      "Set-Cookie",
      `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`
    );

    return response;
  } catch (error) {
    return Response.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
