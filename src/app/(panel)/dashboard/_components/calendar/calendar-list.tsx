"use client"

import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface CalendarListProps{
    times: string[]
}

export function CalendarList({times}: CalendarListProps){
    const searchParams = useSearchParams();
    const date = searchParams.get("date");

    const {data, isLoading } = useQuery({
        queryKey: ["get-calendar", date],
        queryFn: async () => {
            let activeDate = date;

            if(!activeDate){
                const today = format(new Date(), "yyyy-MM-dd");
                activeDate = today;
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/business/calendar?date=${activeDate}`;

            const response = await fetch(url);

            const json = await response.json();
            
            if(!response.ok){
                return [];
            }

            return json;
        }
    })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold">Schedule</CardTitle>
                <button>SELECT A DATE</button>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
                    {times.map((slot) =>{
                        return(
                            <div 
                                key={slot}
                                className="flex items-center py-2 border-t last:border-b"
                            >
                                <div className="w-16 text-sm font-semibold">{slot}</div>
                                <div className="flex-1 text-sm text-gray-500">
                                    Available
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}