"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseSignUpFormProps {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  timeZone?: string | null;
}

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  timeZone: z.string().min(1, { message: "Time Zone is required" }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function useSignUpForm({
  name,
  email,
  phone,
  password,
  timeZone,
}: UseSignUpFormProps = {}) {
  return useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      password: password || "",
      timeZone: timeZone || "",
    },
  });
}
