"use client";

import { IconButton } from "@/components/ui/icon-button";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

export function ButtonCopyLink({ userId }: { userId: string }) {
  async function handleCopyLink() {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/business/${userId}`
    );

    toast.success("Link copied!");
  }

  return (
    <IconButton label="Copy scheduling link" onClick={handleCopyLink}>
      <LinkIcon className="w-5 h-5" />
    </IconButton>
  );
}
