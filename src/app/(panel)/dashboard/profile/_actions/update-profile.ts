"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, {message: "Name is Mandatory"}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.boolean(),
    timeZone: z.string(),
    times: z.array(z.string())
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema){
    const session = await auth();

    if(!session?.user?.id){
        return {
            error: "User Not Found"
        }
    }

    const schema = formSchema.safeParse(formData);
    
    if(!schema.success){
        return {
            error: "Invalid Form"
        }
    }

    try{
        await prisma.user.update({
            where:{
                id: session?.user?.id
            },
            data:{
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                status: formData.status,
                timeZone: formData.timeZone,
                times: formData.times || []
            }
        })

        revalidatePath("/dasahboard/profile");

        return {
            data: "Info Updated!"
        }

    }catch(err){
        return{
            error: "Error Updating user"
        }
    }
}