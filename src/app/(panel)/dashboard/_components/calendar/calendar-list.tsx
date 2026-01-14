"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { cancelAppointment } from "../../_actions/cancel-appointment";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogCalendar } from "./dialog-calendar";
import { ButtonPickerAppointment } from "./button-date";
import {
  AppointmentList,
  AppointmentWithService,
} from "./appointment-list";

interface CalendarListProps {
  times: string[];
}

export function CalendarList({ times }: CalendarListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentWithService | null>(null);

  const {
    data = [] as AppointmentWithService[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-calendar", date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/business/calendar?date=${activeDate}`;

      const response = await fetch(url);

      const json = (await response.json()) as AppointmentWithService;

      if (!response.ok) {
        return [];
      }
      return Array.isArray(json)
        ? (json as AppointmentWithService[])
        : ([] as AppointmentWithService[]);
    },
    staleTime: 20000,
    refetchInterval: 30000,
  });

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId: appointmentId });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["get-calendar"] });
    refetch();
    toast.success(<div data-cy="toast-success">{response.data}</div>);
    router.refresh();
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Schedule
          </CardTitle>
          <ButtonPickerAppointment />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
            <AppointmentList
              times={times}
              appointments={Array.isArray(data) ? data : []}
              isLoading={isLoading}
              onViewDetails={(appointment) => setDetailAppointment(appointment)}
              onCancel={handleCancelAppointment}
            />
          </ScrollArea>
        </CardContent>
      </Card>
      <DialogCalendar appointment={detailAppointment} />
    </Dialog>
  );
}
