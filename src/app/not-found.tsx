import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-marketing-muted via-marketing to-marketing-muted text-center text-marketing-foreground px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Ghost className="h-20 w-20 text-primary drop-shadow-[0_0_12px_var(--primary-glow)] animate-bounce" />
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-marketing-foreground">
            404
          </h1>
          <p className="mt-2 text-lg text-marketing-muted-foreground">
            Oops! The page you’re looking for doesn’t exist.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Link href="/dashboard">Go back home</Link>
        </Button>
      </div>
    </main>
  );
}
