"use client"

import { useProfileForm  } from "./profile-form";
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
} from "@/components/ui/dialog"
import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProfileContent() {

    const form = useProfileForm();

    return (
       <div>
        <Form {...form}>
            <form>
                <Card>
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <div className=" bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                                <Image 
                                    src={imgTest}
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
                                <Dialog>
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
                                            <p className="text-sm text-muted-foreground">
                                                Click on the times to select or unselect:
                                            </p>
                                            <div>

                                            </div>
                                        </section>
                                    </DialogContent>

                                </Dialog>
                            </div>

                        </div>

                    </CardContent>
                </Card>
            </form>
        </Form>
       </div> 
    )
}