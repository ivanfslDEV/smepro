"use server"

import prisma from "@/lib/prisma";
import { addDays, differenceInDays, isAfter } from "date-fns";
import { TRIAL_DAYS } from "./trial-limits";

export async function checkSubscription(userId:string) {
    const user = await prisma.user.findFirst({
        where:{
            id: userId
        },
        include:{
            subscription: true
        }
    });

    if(!user){
        throw new Error("User not found");
    }

    if(user.subscription && user.subscription.status === "active"){
        return{
            subscriptionStatus: "ACTIVE",
            message: "Active Subscription",
            planId: user.subscription.plan
        }
    }



    const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);

    if(isAfter(new Date(), trialEndDate)){
        return{
            subscriptionStatus: "EXPIRED",
            message: "Your Trial Period Expired",
            planId: "TRIAL"
        }
    }

    const daysRemaining = differenceInDays(trialEndDate, new Date());

    return{
        subscriptionStatus: "TRIAL",
        message: `You're in the trial period. Trial ends in ${daysRemaining} days`,
        planId: "TRIAL"
    }
}