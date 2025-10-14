"use client"

import { ProfileFormData, useProfileForm  } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Prisma } from "@/generated/prisma"

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>


interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
    const [selectedHours, setSelectedHours] = useState<string[]>([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });

    function generateTimeSlots(): string[]{
        const hours: string[] = [];

        for(let i =8; i <= 24; i++) {
            for(let j = 0; j < 2; j++){
                const hour = i.toString().padStart(2, "0");
                const minute = (j * 30).toString().padStart(2, "0");
                hours.push(`${hour}:${minute}`);
            }
        }

        return hours;
    }

    const hours = generateTimeSlots();

    function toggleHour(hour: string){
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort());
    }

    const timeZones = Intl.supportedValuesOf("timeZone").filter(
        zone => zone.startsWith("Europe/")
    );

    async function onSubmit(values: ProfileFormData){
        const profileData = {
            ...values,
            times: selectedHours
        }
    }

    return (
       <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <div className=" bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                                <Image 
                                    src={user.image ? user.image : imgTest}
                                    alt="Companys Photo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Enter company name..."
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Enter company address..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Enter company phone..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Status
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value ? "active" : "inactive"}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a status"></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">ACTIVE</SelectItem>
                                                    <SelectItem value="inactive">INACTIVE</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label className="font-semibold">
                                    Set Times
                                </Label>
                                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Click here to set the times
                                            <ArrowRight className="w-5 h-5"/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Company's Open Times
                                            </DialogTitle>
                                            <DialogDescription>
                                                Select the times below
                                            </DialogDescription>
                                        </DialogHeader>
                                        <section className="py-4">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Click on the times to select or unselect:
                                            </p>
                                            <div className="grid grid-cols-5 gap-2">
                                                {hours.map((hour) => (
                                                    <Button
                                                        key={hour}
                                                        variant="outline"
                                                        className={cn("h-10", selectedHours.includes(hour) && "border-2 border-emerald-500 text-primary")}
                                                        onClick={ () => toggleHour(hour)}
                                                    >
                                                        {hour}
                                                    </Button>
                                                ))}
                                            </div>
                                        </section>
                                        <Button 
                                            className="w-full"
                                            onClick={() => setDialogIsOpen(false)}
                                        >
                                            Close Modal
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            
                            <FormField 
                                control={form.control}
                                name="timeZone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Select a timezone
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a timezone"></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeZones.map((zone) => (
                                                        <SelectItem key={zone} value={zone}>
                                                            {zone}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-400"
                            >
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
       </div> 
    )
}