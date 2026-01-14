"use client";

import { IconButton } from "@/components/ui/icon-button";
import { Service } from "@/generated/prisma/client";
import { Pencil, X } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  priceLabel: string;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
}

export function ServiceCard({
  service,
  priceLabel,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  return (
    <article className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="font-light">{service.name}</span>
        <span className="text-muted-foreground">-</span>
        <span
          className="text-muted-foreground"
          data-cy={`service-list-price-${service.name}`}
        >
          {priceLabel}
        </span>
      </div>
      <div>
        <IconButton
          data-cy={`service-edit-${service.name}`}
          label={`Edit ${service.name}`}
          variant="ghost"
          size="icon"
          onClick={() => onEdit(service)}
        >
          <Pencil className="w-4 h-4" />
        </IconButton>
        <IconButton
          data-cy={`service-delete-${service.name}`}
          label={`Delete ${service.name}`}
          variant="ghost"
          size="icon"
          onClick={() => onDelete(service.id)}
        >
          <X className="w-4 h-4" />
        </IconButton>
      </div>
    </article>
  );
}
