"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { handleRegister } from "@/app/(public)/_actions/login";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { handleRegisterExtenalProviders } from "@/app/(public)/_actions/external-login";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await handleRegister("credentials", { email, password });

    if (result?.error) {
      setLoading(false);
      toast.error(result.error);
      return;
    }

    redirect("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await handleRegisterExtenalProviders("google");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Sign In
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Access your account to continue
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-emerald-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center gap-2 mt-1">
                <Lock className="h-4 w-4 text-emerald-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium",
                loading && "opacity-80 cursor-not-allowed"
              )}
            >
              {loading ? "Signing in..." : "Sign In"}
              <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="my-4 text-center text-sm text-gray-500">or</div>

          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            <Chrome className="mr-2 h-4 w-4 text-emerald-500" />
            Continue with Google
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
