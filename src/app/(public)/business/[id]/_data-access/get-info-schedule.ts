"use server"

import prisma from "@/lib/prisma";

export async function getInfoSchedule({userId}:{userId: string}) {
    try{
        return await prisma.user.findUnique({
            where: { id: userId },
            include: {
                subscription: true,
                services: { where: { status: true } },
            },
        });
    }catch(err){
        return null;
    }
}