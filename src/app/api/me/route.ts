import { verifyAccessToken } from "@/utils/auth";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import connectToDB from "../../../../configs/db";
import User from "../../../../models/User";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

export async function GET() {
  try {
    await connectToDB();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return Response.json(
        { message: "User not authorized! Please login" },
        { status: 400 }
      );
    }

    let tokenPayload;

    try {
      tokenPayload = verifyAccessToken(accessToken) as MyJwtPayload;
    } catch (error) {
      if (error instanceof Error && error.name === "TokenExpiredError") {
        return Response.json({ message: "Token expired." }, { status: 401 });
      }
      return Response.json({ message: "Invalid token" }, { status: 403 });
    }

    const verifiedUser = await User.findById(tokenPayload.id)
      .select("firstName lastName email")
      .lean();

    if (!verifiedUser) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    }

    return Response.json(
      { message: "User info", data: verifiedUser },
      { status: 200 }
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
