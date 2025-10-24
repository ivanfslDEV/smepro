"use server"

import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is Mandatory"),
    email: z.string().email("Email is Mandatory"),
    phone: z.string().min(1, "Phone is Mandatory"),
    date: z.date(),
    serviceId: z.string(    ).min(1, "Service is Mandatory"),
    time: z.string().min(1, "Time is Mandatory"),
    businessId: z.string().min(1, "User not found!")
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
    const schema = formSchema.safeParse(formData);
    if(!schema.success){
        return{
            error: schema.error.issues[0].message
        }
    }

    try{
        const selectedDate = new Date(formData.date);

        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

        console.log(selectedDate, year, month, day, appointmentDate);

        const newAppointment = await prisma.appointment.create({
            data:{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                time: formData.time,
                appointmentDate: appointmentDate,
                serviceId: formData.serviceId,
                userId: formData.businessId
            }
        });

        return{
            data: newAppointment
        }

    }catch(err){
        return{
            error: "Something went wrong. Please try again later."
        }
    }
}