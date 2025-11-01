"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function handleRegister(
  provider: string,
  credentials?: { email?: string; password?: string }
) {
  try {
    if (provider === "credentials" && credentials) {
      return await signIn("credentials", {
        email: credentials?.email,
        password: credentials?.password,
        redirect: false,
      });
    }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        case "OAuthAccountNotLinked":
          return { error: "OAuth authentication failed." };
        default:
          return { error: "Unable to sign in." };
      }
    }
    return { error: "Unexpected error during sign-in." };
  }
}
