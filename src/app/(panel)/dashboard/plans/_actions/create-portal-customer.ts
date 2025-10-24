"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {stripe} from "@/utils/stripe";

export async function createPortalCustomer() {
    const session = await auth();

    if(!session?.user?.id){
        return {
            sessionId: "",
            error: "User Not Found!"
        }
    }

    const user = await prisma.user.findFirst({
        where:{
            id: session?.user?.id
        }
    });

    if(!user){
        return {
            sessionId: "",
            error: "User Not Found!"
        }
    }

    const sessionId = user.stripe_customer_id;

    if(!sessionId){
        return {
            sessionId: "",
            error: "User Not Found!"
        }
    }

    try{
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionId,
            return_url: process.env.STRIPE_SECCESS_URL
        });

        return {
            sessionId: portalSession.url
        }
    }catch(err){
        return{
            sessionId: "",
            error: "Something went wrong. Please try again later."
        }
    }

}