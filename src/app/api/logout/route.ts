import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    await connectToDB();
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return Response.json({ message: "No active session" }, { status: 400 });
    }

    let tokenPayload;
    try {
      tokenPayload = verifyAccessToken(accessToken as string);
    } catch (error) {
      if (error instanceof Error && error.name === "TokenExpiredError") {
        return Response.json({ message: "Token expired." }, { status: 401 });
      }
      return Response.json({ message: "Invalid token" }, { status: 403 });
    }

    cookieStore.delete("accessToken");

    const response = Response.json(
      {
        message: "Logout successfully!",
      },
      {
        status: 200,
      }
    );

    response.headers.append(
      "Set-Cookie",
      "accessToken=; Path=/; HttpOnly; SameSite=strict"
    );

    return response;
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
