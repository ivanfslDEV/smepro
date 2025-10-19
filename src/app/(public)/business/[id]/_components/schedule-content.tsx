"use client"

import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma";
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { ScheduleTimeList } from "./schedule-time-list";
import { createNewAppointment } from "../_actions/create-appointment";
import { toast } from "sonner";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true,
    }
}>

interface ScheduleContentProps{
    business: UserWithServiceAndSubscription
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export function ScheduleContent({ business }: ScheduleContentProps){
    const form = useAppointmentForm();
    const { watch } = form;
    const selectedDate = watch("date");
    const selectedServiceId = watch("serviceId");

    const [selectedTime, setSelectedTime] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

    const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
        setLoadingSlots(true);
        try{
            const dateString = date.toISOString().split('T')[0];
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${business.id}&date=${dateString}`);
            
            const json = await response.json();
            setLoadingSlots(false);
            return json;
        }catch(err){
            setLoadingSlots(false);
            return [];
        }
    }, []);

    useEffect(() => {

        if(selectedDate){
            fetchBlockedTimes(selectedDate).then((blocked) => {
                setBlockedTimes(blocked);

                const times = business.times || [];

                const finalSlots = times.map((time) => ({
                    time: time,
                    available: !blocked.includes(time)
                }));
                
                setAvailableTimeSlots(finalSlots);

                const stillAvailable = finalSlots.find(
                    (slot) => slot.time === selectedTime && slot.available
                )

                if(!stillAvailable){
                    setSelectedTime("");
                }
            })
        }

    }, [selectedDate, business.times, fetchBlockedTimes, selectedTime]);

    async function handleRegisterAppointment(formData:AppointmentFormData) {
        if(!selectedTime){
            return;
        }
        
        const response = await createNewAppointment({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            time: selectedTime,
            date: formData.date,
            serviceId: formData.serviceId,
            businessId: business.id
        });

        if(response.error){
            toast.error(response.error);
            return;
        }
        toast.success("Appointment Scheduled!");
        form.reset();
        setSelectedTime("");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500"/>
            <section className="container mx-auto px-4 -mt-18">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image
                                src={business.image ? business.image : imgTest}
                                alt="Business Photo"
                                className="object-cover"
                                fill
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">{business.name}</h1>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5" />
                            <span>{ business.address ? business.address : "Address not informed" }</span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="max-w-2xl mx-auto w-full mt-6">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(handleRegisterAppointment)}
                        className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Full Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Type your full name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="my-2 mt-3">
                                    <FormLabel className="font-semibold">E-mail:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="Type your e-mail..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem className="my-2 mt-3">
                                    <FormLabel className="font-semibold">Phone Number:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="phone"
                                            placeholder="(XX) XXXX-XXXX"
                                            onChange = {(e) => {
                                                const formattedValue = formatPhone(e.target.value)
                                                field.onChange(formattedValue)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className="flex items-center gap-2 space-y-1 mt-5">
                                    <FormLabel className="font-semibold">Appointment Date:</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            initialDate={new Date()}
                                            className="w-full rounded border p-2"
                                            onChange={(date) => {
                                                if(date) {
                                                    field.onChange(date)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={({field}) => (
                                <FormItem className="my-2 mt-3 max-w-full">
                                    <FormLabel className="font-semibold">Select a Service:</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {business.services.map((service) => (
                                                    <SelectItem key={service.id} value={service.id}>
                                                        {service.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        { selectedServiceId && (
                            <div className="space-y-2">
                                <Label className="font-semibold">Available Times:</Label>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    {loadingSlots ? (
                                        <p> Loading...</p>
                                    ) : availableTimeSlots.length === 0 ? (
                                        <p>No Available Times</p>
                                    ): (
                                        <ScheduleTimeList
                                            onSelectTime={(time) => setSelectedTime(time)}
                                            businessTimes={business.times}
                                            blockedTimes={blockedTimes}
                                            availableTimeSlots={availableTimeSlots}
                                            selectedTime={selectedTime}
                                            selectedDate={selectedDate}
                                            requiredSlots={
                                                business.services.find(service => service.id === selectedServiceId) ? Math.ceil(business.services.find(service => 
                                                service.id === selectedServiceId )!.duration / 30) : 1
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {business.status ? (
                            <Button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-400"
                                disabled={!watch("name") || !watch("email") || !watch("phone") || !watch("date")}
                            >
                                Schedule Appointment
                            </Button>
                        ) : (
                            <p className="bg-red-500 text-white text-center px-4 py-2 rounded-md">
                                Business is Inactive
                            </p>
                        )}
                        

                    </form>
                </Form>
            </section>
        </div>
    )
}