import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.AccessTokenSecretKey);

export async function authMiddleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const tokenPayload = await jose.jwtVerify(accessToken, secret);

    if (!tokenPayload) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error ❌", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
