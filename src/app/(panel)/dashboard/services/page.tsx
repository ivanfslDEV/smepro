import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

export default async function Services() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center py-20">
          <Loader label="Loading..." size="lg" />
        </div>
      }
    >
      <ServicesContent userId={session.user?.id!} />
    </Suspense>
  );
}
