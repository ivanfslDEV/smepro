"use server"

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plans";

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED"

interface ResultPermissionProp{
    hasPermission: boolean,
    planId: PLAN_PROP,
    expired: boolean,
    plan: PlanDetailInfo | null,
}

interface CanPermissionProps{
    type: string;
}

export async function CanPermission({type}:CanPermissionProps): Promise<ResultPermissionProp> {
    const session = await auth();

    if(!session?.user?.id){
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null,
        }
    }

    switch (type){
        case "service":
            return {
                hasPermission: false,
                planId: "EXPIRED",
                expired: true,
                plan: null,
            }
        default:
            return {
                hasPermission: false,
                planId: "EXPIRED",
                expired: true,
                plan: null,
            }
    }

}