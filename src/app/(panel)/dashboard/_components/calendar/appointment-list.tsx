"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Loader } from "@/components/ui/loader";
import { Prisma } from "@/generated/prisma";
import { Eye, X } from "lucide-react";

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

interface AppointmentListProps {
  times: string[];
  appointments: AppointmentWithService[];
  isLoading?: boolean;
  onViewDetails: (appointment: AppointmentWithService) => void;
  onCancel: (appointmentId: string) => void;
}

export function AppointmentList({
  times,
  appointments,
  isLoading = false,
  onViewDetails,
  onCancel,
}: AppointmentListProps) {
  if (isLoading) {
    return <Loader label="Loading..." size="lg" />;
  }

  const occupantMap: Record<string, AppointmentWithService> = {};

  for (const appointment of appointments) {
    const requiredSlots = Math.ceil(appointment.service.duration / 30);
    const startIndex = times.indexOf(appointment.time);

    if (startIndex === -1) {
      continue;
    }

    for (let i = 0; i < requiredSlots; i++) {
      const slotIndex = startIndex + i;

      if (slotIndex < times.length) {
        occupantMap[times[slotIndex]] = appointment;
      }
    }
  }

  return (
    <div className="flex flex-col">
      {times.map((slot) => {
        const occupant = occupantMap[slot];
        if (occupant) {
          return (
            <div
              data-cy={`time-slot-calendar-${slot}`}
              key={slot}
              className="flex items-center py-2 border-t last:border-b"
            >
              <div className="w-16 text-sm font-semibold">{slot}</div>
              <div className="flex-1 text-sm">
                <div
                  data-cy={`time-slot-calendar-name-${slot}`}
                  className="font-semibold"
                >
                  {occupant.name}
                </div>
                <div
                  data-cy={`time-slot-calendar-phone-${slot}`}
                  className="text-sm text-muted-foreground"
                >
                  {occupant.phone}
                </div>
              </div>

              <div className="ml-auto">
                <div className="flex">
                  <DialogTrigger asChild>
                    <IconButton
                      data-cy={`time-slot-calendar-details-${slot}`}
                      label="View appointment details"
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(occupant)}
                    >
                      <Eye className="w-4 h-4" />
                    </IconButton>
                  </DialogTrigger>

                  <IconButton
                    data-cy={`time-slot-calendar-cancel-${slot}`}
                    label="Cancel appointment"
                    variant="ghost"
                    size="icon"
                    onClick={() => onCancel(occupant.id)}
                  >
                    <X className="w-4 h-4" />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            data-cy={`time-slot-calendar-${slot}`}
            key={slot}
            className="flex items-center py-2 border-t last:border-b"
          >
            <div className="w-16 text-sm font-semibold">{slot}</div>
            <div className="flex-1 text-sm text-muted-foreground">
              Available
            </div>
          </div>
        );
      })}
    </div>
  );
}
