"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    reminderId: z.string().min(1, "ID is required."),
});

type FormSchema = z.infer<typeof formSchema>;

export async function deleteReminder(formData: FormSchema) {
    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return{
            error: schema.error.issues[0].message
        }
    }

    try{
        await prisma.reminder.delete({
            where:{
                id: formData.reminderId
            }
        })

        revalidatePath("/dashboard")

        return{
            data: "Reminder deleted"
        }

    }catch(err){
        return{
            error: "Something went wrong. Please try again later."
        }
    }
}