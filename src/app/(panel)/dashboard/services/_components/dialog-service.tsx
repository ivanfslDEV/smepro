"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./dialog-service-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { convertToCents } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { updateService } from "../_actions/update-service";
import { TextField } from "@/components/ui/text-field";

interface DialogServiceProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export function DialogService({
  closeModal,
  serviceId,
  initialValues,
}: DialogServiceProps) {
  const form = useDialogServiceForm({ initialValues: initialValues });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertToCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        serviceId: serviceId,
        name: values.name,
        priceInCents: priceInCents,
        duration: duration,
      });
      return;
    }

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(<div data-cy="toast-success">Service created</div>);
    handleCloseModal();
    router.refresh();
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId: serviceId,
      name: name,
      price: priceInCents,
      duration: duration,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    setLoading(false);

    toast.success(<div data-cy="toast-success">{response.data}</div>);
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function changeCurrency(
    event: ChangeEvent<HTMLInputElement>,
    onValueChange: (value: string) => void
  ) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    onValueChange(value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>New Service</DialogTitle>
        <DialogDescription>Add a new service</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <TextField
              control={form.control}
              name="name"
              label="Service Name"
              placeholder="Service Name"
              itemClassName="my-2"
              inputProps={{ "data-cy": "name-new-service-form" }}
            />

            <TextField
              control={form.control}
              name="price"
              label="Service price"
              placeholder="120,00"
              itemClassName="my-2"
              inputProps={{ "data-cy": "price-new-service-form" }}
              onChange={(event, field) =>
                changeCurrency(event, field.onChange)
              }
            />
          </div>

          <p className="font-semibold">Service Duration:</p>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              control={form.control}
              name="hours"
              label="Hours:"
              placeholder="1"
              itemClassName="my-2"
              inputProps={{
                "data-cy": "hour-new-service-form",
                min: "0",
                type: "number",
              }}
            />
            <TextField
              control={form.control}
              name="minutes"
              label="Minutes:"
              placeholder="1"
              itemClassName="my-2"
              inputProps={{
                "data-cy": "minute-new-service-form",
                min: "0",
                type: "number",
              }}
            />
          </div>

          <Button
            data-cy="save-button-new-service-form"
            type="submit"
            className="w-full font-semibold"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : `${serviceId ? "Update Service" : "Create Service"}`}
          </Button>
        </form>
      </Form>
    </>
  );
}
