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

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true,
    }
}>

interface ScheduleContentProps{
    business: UserWithServiceAndSubscription
}

export function ScheduleContent({ business }: ScheduleContentProps){
    const form = useAppointmentForm();
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
                    <form className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
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
                                <FormItem className="flex items-center gap-2 space-y-1">
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
                    </form>
                </Form>
            </section>
        </div>
    )
}