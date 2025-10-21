"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Prisma } from "@/generated/prisma";
import { includes } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
import { cancelAppointment } from "../../_actions/cancel-appointment";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCalendar } from "./dialog-calendar";
import { ButtonPickerAppointment } from "./button-date";

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
    include:{
        service:true
    }
}>

interface CalendarListProps{
    times: string[]
}

export function CalendarList({times}: CalendarListProps){
    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const router = useRouter(); 
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [detailAppointment, setDetailAppointment] = useState<AppointmentWithService|null>(null);

    const {data, isLoading, refetch } = useQuery({
        queryKey: ["get-calendar", date],
        queryFn: async () => {
            let activeDate = date;

            if(!activeDate){
                const today = format(new Date(), "yyyy-MM-dd");
                activeDate = today;
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/business/calendar?date=${activeDate}`;

            const response = await fetch(url);

            const json = await response.json() as AppointmentWithService;
            
            if(!response.ok){
                return [];
            }

            return json;
        },
        staleTime: 20000,
        refetchInterval: 30000
    });

    const hasData = Array.isArray(data) ? data.length > 0 : data != null;
    const occupantMap: Record<string, AppointmentWithService> = {};

    if(hasData){
        for(const appointment of data){
            const requiredSlots = Math.ceil(appointment.service.duration / 30);

            const startIndex = times.indexOf(appointment.time)

            if(startIndex !== -1){
                for(let i = 0; i < requiredSlots; i++){
                    const slotIndex = startIndex + i;

                    if(slotIndex < times.length) {
                        occupantMap[times[slotIndex]] = appointment;
                    }
                }
            }
        }
    }

    async function handleCancelAppointment(appointmentId:string) {
        const response = await cancelAppointment({appointmentId: appointmentId});
        if(response.error){
            toast.error(response.error);
            return;
        }

        queryClient.invalidateQueries({queryKey: ["get-calendar"]});
        refetch();
        toast.success(response.data);
        router.refresh();
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">Schedule</CardTitle>
                    <ButtonPickerAppointment/>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
                        {isLoading ? (
                            <p>Loading...</p>
                        ): (
                            times.map((slot) =>{
                                const occupant = occupantMap[slot]
                                if(occupant){
                                    return(
                                        <div 
                                            key={slot}
                                            className="flex items-center py-2 border-t last:border-b"
                                        >
                                            <div className="w-16 text-sm font-semibold">{slot}</div>
                                            <div className="flex-1 text-sm">
                                                <div className="font-semibold">{occupant.name}</div>
                                                <div className="text-sm text-gray-500">{occupant.phone}</div>
                                            </div>

                                            <div className="ml-auto">
                                                <div className="flex">
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setDetailAppointment(occupant)}
                                                        >
                                                            <Eye className="w-4 h-4"/>
                                                        </Button>
                                                    </DialogTrigger>
                                                    
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleCancelAppointment(occupant.id)}
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }

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
                        })
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
            <DialogCalendar 
                appointment={detailAppointment}
            />
        </Dialog>
    )
}