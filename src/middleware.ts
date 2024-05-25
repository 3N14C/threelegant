import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "./auth";

export const middleware = async (req: NextRequest) => {
  const authSession = cookies().get("auth_session")?.value;

  if (authSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/auth/:path*"],
};
