"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function handleRegisterExtenalProviders(
  provider: string,
  credentials?: { email?: string; password?: string }
) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
