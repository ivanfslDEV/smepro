"use client"

import { Subscription } from "@/generated/prisma";
import { toast } from "sonner";
import { subscriptionPlans } from "@/utils/plans/index";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface SubscriptionDetailProps{
    subscription: Subscription;
}

export function SubscriptionDetail({subscription}: SubscriptionDetailProps){

    const subscriptionInfo = subscriptionPlans.find( plan => plan.id === subscription.plan);

    async function handleManageSubscription() {
        console.log("teste")
    }

    return(
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Your Current Plan</CardTitle>
                <CardDescription>
                    Your Subscriptions is active!
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-xl">
                        {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
                    </h3>

                    <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
                        {subscription.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </div>
                </div>
                <ul className="list-disc list-inside space-y-2">
                    {subscriptionInfo && subscriptionInfo.features.map(feature => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={handleManageSubscription}
                >
                    Manager Subscription
                </Button>
            </CardFooter>
        </Card>
    )
}