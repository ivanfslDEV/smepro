"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ReminderContent(){

    const form = useReminderForm();

    async function onSubmit(formData: ReminderFormData) {
        console.log(formData.description);
    }

    return(
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form 
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-semibold">
                                    Reminder:
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Ex: Call John Doe"
                                        className="max-h-52"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit"
                        disabled={!form.watch("description")}
                    >
                        Create Reminder
                    </Button>
                </form>
            </Form>
        </div>
    )
}