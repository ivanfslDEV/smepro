import type { ChangeEvent, ComponentProps } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type InputProps = Omit<
  ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "onBlur"
> &
  DataAttributes;

interface TextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  itemClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputProps?: InputProps;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => void;
}

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  itemClassName,
  labelClassName,
  inputClassName,
  inputProps,
  onChange,
}: TextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(event, field);
            return;
          }
          field.onChange(event);
        };

        return (
          <FormItem className={itemClassName}>
            <FormLabel className={cn("font-semibold", labelClassName)}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                {...inputProps}
                className={cn(inputClassName, inputProps?.className)}
                placeholder={placeholder ?? inputProps?.placeholder}
                onChange={handleChange}
                onBlur={field.onBlur}
              />
            </FormControl>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
