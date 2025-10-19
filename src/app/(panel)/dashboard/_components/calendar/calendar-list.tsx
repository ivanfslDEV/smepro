"use client"

import { useSearchParams } from "next/navigation"

interface CalendarListProps{
    times: string[]
}

export function CalendarList({times}: CalendarListProps){

    const searchParams = useSearchParams();
    const date = searchParams.get("date")

    return (
        <div className="">
            List 
        </div>
    )
}