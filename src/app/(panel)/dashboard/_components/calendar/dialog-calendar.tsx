import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentWithService } from "./calendar-list";
import { format } from "date-fns";

interface DialogCalendarPros{
    appointment: AppointmentWithService | null
}

export function DialogCalendar({appointment }: DialogCalendarPros){
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Appointment Details
                </DialogTitle>
                <DialogDescription>
                    View Appointment Details
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {appointment && (
                    <article>
                        <p><span className="font-semibold">Schedule Time:</span>{appointment.time}</p>
                        <p className="mb-2"><span className="font-semibold">Schedule Date:</span>{format(appointment.appointmentDate, "dd/MM/yyyy")}</p>
                        <p><span className="font-semibold">Name:</span>{appointment.name}</p>
                        <p><span className="font-semibold">Phone:</span>{appointment.phone}</p>
                        <p><span className="font-semibold">E-mail:</span>{appointment.email}</p>
                        <section className="bg-gray-100 mt-4 p-2 rounded-md">
                            <p><span className="font-semibold">Service:</span>{appointment.service.name}</p>
                        </section>
                    </article>
                )}
            </div>
        </DialogContent>
    )
}