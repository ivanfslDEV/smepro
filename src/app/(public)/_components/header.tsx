"use client"

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const session = null;

    const navItems = [
        { href: "#professionals", label: "Professionals" }
    ]

    const NavLinks = () => (
        <>
            {
                navItems.map((item) => (
                    <Button
                        onClick={() => setIsOpen(false)}
                        key={item.href}
                        asChild
                        className="bg-transparent hover:bg-transparent text-black shadow-none"
                    >
                        <Link href={item.href} className="text-base">
                            {item.label}
                        </Link>
                    </Button>
                ))
            }
            {
                session ? (
                    <Link href="/dashboard" className="flex items-center justify-center gap-2">
                        Access Store
                    </Link>
                ) : (
                    <Button>
                        <LogIn/>
                        Log In
                    </Button>
                )
            }
        </>
    );

    return (
        <header 
            className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white"
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link 
                    href="/"
                    className="text-3xl font-bold text-zinc-900"
                >
                    SME<span className="text-emerald-500">Pro</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-4">
                    <NavLinks/>
                </nav>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            className="bg-emerald-500 text-black hover:bg-transparent"
                            size="icon"
                        >
                            <Menu className="w-6 h-6"></Menu>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999]">
                        <div className="px-4 py-3">
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                See our Links
                            </SheetDescription>
                            <nav className="flex flex-col space-y-4">
                                <NavLinks/>
                            </nav>
                        </div>
                        
                        
                    </SheetContent>

                </Sheet>
            </div>
        </header>
    )
}