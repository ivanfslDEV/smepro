import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center text-gray-100 px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Ghost className="h-20 w-20 text-green-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.3)] animate-bounce" />
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">
            404
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Oops! The page you’re looking for doesn’t exist.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Link href="/dashboard">Go back home</Link>
        </Button>
      </div>
    </main>
  );
}
