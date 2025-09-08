import connectToDB from "@/configs/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { firstName, lastName, email, password, profileColor } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileColor,
    });

    return Response.json(
      { message: "Registration completed successfully" },
      {
        status: 201,
      }
    );
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
