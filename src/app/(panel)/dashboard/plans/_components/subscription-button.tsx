"use client"

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma";
import { createSubscription } from "./create-subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface SubscriptionButtonProps{
    type: Plan
}

export function SubscriptionButton({ type }: SubscriptionButtonProps){
    async function handleCreateBilling() {
        const {sessionId, error, url } = await createSubscription({type: type});
        
        if(error){
            toast.error(error);
            return;
        }

        const stripe = await getStripeJs();

        if(stripe && url){
            window.location.href = url;
        }
    }

    return(
        <Button 
            className={`w-full ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-400"}`}
            onClick={handleCreateBilling}
        >
            Subscribe
        </Button>
    )
}