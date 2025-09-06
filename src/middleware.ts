import * as jose from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";

const secret = new TextEncoder().encode(process.env.AccessTokenSecretKey);

async function verifyToken(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const tokenPayload = await jose.jwtVerify(accessToken, secret);
    return tokenPayload;
  } catch (error) {
    console.error("Token verify error ❌", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenPayload = await verifyToken(request);

  if (pathname.startsWith("/board")) {
    if (!tokenPayload) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname === "/" || pathname.startsWith("/sign-up")) {
    if (tokenPayload) {
      return NextResponse.redirect(new URL("/board", request.url));
    }
  }

  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-up", "/board", "/board/:path*"],
};
