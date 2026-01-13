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
import { Prisma, User } from "@/generated/prisma";
import { PremiumCardBadge } from "./premium-badge";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-muted py-6" id="professionals">
      <div className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Business Avalible
        </h2>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((business) => (
            <Card
              className="overflow-hidden pt-0 hover:shadow-lg duration-300"
              key={business.id}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-48">
                    <Image
                      src={business.image ?? photoImg}
                      alt="Company photo"
                      fill
                      className="object-cover"
                    />
                    {business?.subscription?.status === "active" &&
                      business?.subscription?.plan === "PROFESSIONAL" && (
                        <PremiumCardBadge />
                      )}
                  </div>
                </div>

                <div className="p-4 space-y-4 min-h-[160px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{business.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {business.address ?? "Address Not Found"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/business/${business.id}`}
                    target="_blank"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                  >
                    Make an Appointment
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
