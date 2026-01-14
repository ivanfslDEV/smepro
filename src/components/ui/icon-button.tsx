import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = ComponentProps<typeof Button> & {
  label: string;
};

export function IconButton({
  label,
  className,
  size = "icon",
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      size={size}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
