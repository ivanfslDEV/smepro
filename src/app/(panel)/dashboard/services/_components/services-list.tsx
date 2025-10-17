"use client"

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServiceListPros{
    services: Service[]
}

export function ServicesList({ services }: ServiceListPros) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editingService, setEditingService] = useState<null | Service>(null);

    function handleDialogChange(open: boolean) {
        setDialogIsOpen(open);
        if (!open) {
        console.log("[ServicesList] Dialog closed"); // <-- aqui o console
        setEditingService(null);
        }
    }

    async function handleDeleteService(serviceId: string){
        const response = await deleteService({ serviceId: serviceId});
        if(response.error){
            toast.error(response.error);
            return;
        }
        toast.success(response.data);
    }

    function handleEditService(service: Service){
        setEditingService(service);
        setDialogIsOpen(true);
    }

    return(
        <Dialog open={dialogIsOpen} onOpenChange={handleDialogChange}>
            <section className="mx-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-bold">Services</CardTitle>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4"/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogService
                                closeModal={ () => {
                                    setDialogIsOpen(false);
                                    setEditingService(null);
                                }}
                                serviceId={editingService ? editingService.id : undefined}
                                initialValues={editingService ? {
                                    name: editingService.name,
                                    price: (editingService.price / 100).toFixed(2).replace(".", ","),
                                    hours: Math.floor(editingService.duration / 60).toString(),
                                    minutes: (editingService.duration % 60).toString()
                                } : undefined }
                            />
                        </DialogContent>
                    </CardHeader>
                    
                    <CardContent>
                        <section className="space-y-4 mt-5">
                                {services.map(service => (
                                    <article 
                                        key={service.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span className="font-light">{service.name}</span>
                                            <span className="text-gray-500">-</span>
                                            <span className="text-gray-500">{formatCurrency(service.price / 100)}</span>
                                        </div>
                                        <div className="">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={ () => handleEditService(service)}
                                            >
                                                <Pencil className="w-4 h-4"></Pencil>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={ () => handleDeleteService(service.id)}
                                            >
                                                <X className="w-4 h-4"></X>
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                        </section>
                    </CardContent>

                </Card>
            </section>
        </Dialog>
        
    )
}