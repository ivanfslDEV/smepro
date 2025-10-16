import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is Mandatory"}),
    price: z.string().min(1, { message: "Price is Mandatory"}),
    hours: z.string(),
    minutes: z.string(),
});

export interface UserDialogServiceFormProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({ initialValues }: UserDialogServiceFormProps) {
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues ||  {
            name: "",
            price: "",
            hours: "0",
            minutes: "0",
        }
    });
}