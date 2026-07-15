"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { fleet } from "@/lib/fleet-data";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a contact number"),
  vehicle: z.string().min(1, "Please select a preferred vehicle"),
  dates: z.string().min(3, "Please share your preferred dates"),
  message: z.string().optional(),
});

type InquiryValues = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      dates: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryValues) => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 900));
    setPending(false);
    toast.success("Inquiry received", {
      description: `Thank you, ${data.name}. Our concierge will respond shortly.`,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      <FieldGroup>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!errors.name || undefined}>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              placeholder="Alexandre Dupont"
              aria-invalid={!!errors.name}
              className="h-11 border-gold/20 bg-obsidian"
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.email || undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className="h-11 border-gold/20 bg-obsidian"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!errors.phone || undefined}>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="+377 00 00 00 00"
              aria-invalid={!!errors.phone}
              className="h-11 border-gold/20 bg-obsidian"
              {...register("phone")}
            />
            <FieldError errors={[errors.phone]} />
          </Field>

          <Field data-invalid={!!errors.vehicle || undefined}>
            <FieldLabel htmlFor="vehicle">Preferred Vehicle</FieldLabel>
            <Controller
              name="vehicle"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="vehicle" aria-invalid={!!errors.vehicle} className="h-11 w-full border-gold/20 bg-obsidian">
                    <SelectValue placeholder="Select a marque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {fleet.map((v) => (
                        <SelectItem key={v.slug} value={v.slug}>
                          {v.brand} {v.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="undecided">Not yet decided</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.vehicle]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.dates || undefined}>
          <FieldLabel htmlFor="dates">Preferred Dates</FieldLabel>
          <Input
            id="dates"
            placeholder="e.g. 12–15 August 2026"
            aria-invalid={!!errors.dates}
            className="h-11 border-gold/20 bg-obsidian"
            {...register("dates")}
          />
          <FieldError errors={[errors.dates]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            placeholder="Tell us about your itinerary, hotel, or special requests…"
            rows={5}
            className="border-gold/20 bg-obsidian resize-none"
            {...register("message")}
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-12 w-full bg-gold text-obsidian hover:bg-gold/90 tracking-[0.15em] uppercase md:w-auto md:px-12"
        >
          {pending ? (
            <>
              <Spinner data-icon="inline-start" />
              Sending…
            </>
          ) : (
            "Submit Inquiry"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
