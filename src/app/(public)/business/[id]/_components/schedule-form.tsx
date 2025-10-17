"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z }    from "zod";

export const appointmentSchema = z.object({
    name: z.string().min(1, "Name is Mandatory"),
    email: z.string().email("Email is Mandatory"),
    phone: z.string().min(1, "Phone is Mandatory"),
    data: z.date(),
    serviceId: z.string(    ).min(1, "Service is Mandatory")
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function useAppointmentForm(){
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues:{
            name: '',
            email: '',
            phone: '',
            serviceId: '',
            data: new Date(),
        }
    });
}
