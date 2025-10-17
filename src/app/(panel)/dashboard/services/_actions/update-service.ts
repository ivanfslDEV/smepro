"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    serviceId: z.string().min(1, "Id is Mandatory"),
    name: z.string().min(1, { message: "Name is Mandatory"}),
    price: z.number().min(1, { message: "Price is Mandatory"}),
    duration: z.number()
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateService(formData:FormSchema){
    const session = await auth();
            
    if(!session?.user?.id){
        return {
            error: "User Not Found"
        }
    }
            
    const schema = formSchema.safeParse(formData);
                
    if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }
    }

    try{
        await prisma.service.update({
            where:{
                id: formData.serviceId,
                userId: session?.user?.id,
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration
            }
        });

        revalidatePath("dashboard/services");

        return {
            data: "Service Updated!"
        }
    }catch(err){
        return{
            error: "Error"
        }
    }
}