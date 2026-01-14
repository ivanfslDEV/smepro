"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/generated/prisma";
import { Plus, Trash } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ReminderContent } from "./reminder-content";
import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Reminders
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <IconButton
                data-cy="open-reminder-form"
                label="Create reminder"
                variant="ghost"
                className="w-9 p-0"
              >
                <Plus className="w-5 h-5" />
              </IconButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Reminder</DialogTitle>
                <DialogDescription>Create a new reminder</DialogDescription>
              </DialogHeader>

              <ReminderContent closeDialog={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {reminder.length === 0 && (
            <p className="text-sm text-muted-foreground">
              You have 0 reminder(s)
            </p>
          )}

          <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
            {reminder.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap flex-row items-center justify-between py-2 bg-warning/15 mb-2 px-2 rounded-md"
              >
                <p
                  data-cy="reminder-list-item"
                  className="text-sm lg:text-base text-foreground"
                >
                  {item.description}
                </p>
                <IconButton
                  data-cy="remove-button-reminder-item"
                  label="Remove reminder"
                  className="bg-destructive hover:bg-destructive/90 shadow-none rounded-full p-2"
                  size="sm"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash className="w-4 h-4 text-destructive-foreground" />
                </IconButton>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
