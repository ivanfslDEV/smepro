"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form";
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

export function DialogService(){

    const form = useDialogServiceForm();

    async function onSubmit(values:DialogServiceFormData) {
        
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>){
        let {value} = event.target;
        value = value.replace(/\D/g, '');

        if(value){
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace('.', ',');
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        event.target.value = value;
        form.setValue("price", value);
    }

    return(
        <>
            <DialogHeader>
                <DialogTitle>New Service</DialogTitle>
                <DialogDescription>
                    Add a new service
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form 
                    className="space-y-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Service Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Service Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Service price</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="120,00" onChange={changeCurrency}  />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <p className="font-semibold">Service Duration:</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Hours:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1" min="0" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Minutes:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1" min="0" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full font-semibold text-white">
                        Create Service
                    </Button>
                </form>
            </Form>
        </>
    )
}