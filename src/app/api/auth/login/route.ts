import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encode } from "@auth/core/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await encode({
    secret: process.env.AUTH_SECRET!,
    token: {
      name: user.name,
      email: user.email,
      sub: user.id,
    },
    salt: "",
  });

  const cookieName = process.env.AUTH_SESSION_TOKEN ?? "authjs.session-token";

  (await cookies()).set(cookieName, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  return NextResponse.json({ success: true });
}
