import Link from "next/link";

export function LabelSubscription({ expired }: { expired: boolean}){
    return(
        <div 
            className="bg-destructive text-destructive-foreground text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:flex-row md:items-center 
            justify-between gap-1"
        >
            <div>
                {expired ? (
                    <h3 className="font-semibold">
                        Your subscription is expired or you don't have a active plan
                    </h3>
                ): (
                    <h3 className="font-semibold">
                        You reached the subscription limit
                    </h3>
                )}
                <p className="text-sm text-destructive-foreground/90">
                    Access your plan to see the details
                </p>
            </div>
            <Link
                href="/dashboard/plans"
                className="bg-destructive-foreground text-destructive px-3 py-1 rounded-md w-fit hover:bg-destructive-foreground/90"
            >
                Access Subscriptions
            </Link>
        </div>
    )
}
