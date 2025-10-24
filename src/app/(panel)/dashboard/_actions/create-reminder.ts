"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    description: z.string().min(1, "Please add a description."),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createReminder(formData: FormSchema) {
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
        await prisma.reminder.create({
            data:{
                description: formData.description,
                userId: session?.user?.id
            }
        });

        revalidatePath("/dashboard")

        return{
            data: "Reminder created"
        }

    }catch(err){
        return{
            error: "Something went wrong. Please try again later."
        }
    }
}