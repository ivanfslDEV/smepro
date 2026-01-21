import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Calendar } from "./_components/calendar/calendar";
import { CalendarCheck2 } from "lucide-react";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";
import CalendarApp from "./_components/calendar/schedule";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscription(session?.user?.id);

  return (
    <main>
      <div className="space-x-2 flex items-center justify-end">
        <Link href={`/business/${session.user?.id}`} target="_blank">
          <Button
            data-cy="create-new-appointment-button"
            className="flex-1 md:flex-[0]"
          >
            <CalendarCheck2 className="w-5 h-5" />
            <span>New Appointment</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription?.subscriptionStatus === "TRIAL" && (
        <div className="bg-primary text-primary-foreground text-sm md:text-base px-3 py-2 rounded-md mt-2">
          <p className="font-semibold">{subscription?.message}</p>
        </div>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1">
          <CalendarApp />
        </section>
      )}
    </main>
  );
}
