"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    appointmentId: z.string().min(1, "No Appointment sent"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function cancelAppointment(formData:FormSchema) {
    const session = await auth();
    
    if(!session?.user?.id){
        return {
            error: "No account found"
        }
    }
    
    const schema = formSchema.safeParse(formData);
    
    if(!schema.success){
        return{
            error: schema.error.issues[0].message
        }
    }

    try{
        await prisma.appointment.delete({
            where:{
                id: formData.appointmentId,
                userId: session.user?.id
            }
        })

        revalidatePath("/dashboard");

        return{
            data:"Appointment canceled"
        }
    }catch(err){
        return{
            error: "Something went wrong. Please try again later."
        }
    }
}