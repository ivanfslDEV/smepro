import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import photoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export function Professionals() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center mb-12 font-bold">Business Avalible</h2>
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="overflow-hidden pt-0">
                        <CardContent className="p-0">
                            <div>
                                <div className="relative h-48">
                                    <Image 
                                        src={photoImg}
                                        alt="Company photo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            Lorem Ypsom
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Stree x, Center, London - GB
                                        </p>
                                    </div>

                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                </div>

                                <Link
                                    href="/company/123"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                                >
                                    Make an Appointment
                                    <ArrowRight className="ml-2"/>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </section>
    )
}