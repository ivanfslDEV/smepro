"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";
import { Loader } from "@/components/ui/loader";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navItems = [{ href: "#professionals", label: "Professionals" }];

  async function handleLogin() {
    setLoading(true);
    await handleRegister("google");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-foreground shadow-none"
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-1 px-4 rounded hover:bg-primary/90"
        >
          Access Store
        </Link>
      ) : (
        <>
          {loading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg animate-fade-in">
              <div className="rounded-xl bg-card text-card-foreground p-6 shadow-lg">
                <Loader label="Signing in…" size="lg" />
              </div>
            </div>
          ) : (
            <Button onClick={handleLogin}>
              <LogIn />
              Log In
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-foreground">
          SME<span className="text-primary">Pro</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="icon"
            >
              <Menu className="w-6 h-6"></Menu>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]"
          >
            <div className="px-4 py-3">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>See our Links</SheetDescription>
              <nav className="flex flex-col space-y-4">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
