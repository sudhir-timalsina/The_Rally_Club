"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { partnershipSchema, type PartnershipInput } from "@/lib/validations";
import { submitPartnershipEnquiry } from "@/lib/actions/partners";

const COLLAB_OPTIONS: { value: PartnershipInput["collaborationType"]; label: string }[] = [
  { value: "instructor", label: "Instructor (Pilates, fitness, etc.)" },
  { value: "venue", label: "Venue" },
  { value: "wellness_brand", label: "Wellness brand" },
  { value: "lifestyle_brand", label: "Fashion / lifestyle brand" },
  { value: "cafe_restaurant", label: "Café / restaurant" },
  { value: "event_partner", label: "Event partner" },
  { value: "other", label: "Other" },
];

export function PartnerForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnershipInput>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { collaborationType: "other" },
  });

  async function onSubmit(values: PartnershipInput) {
    setState("submitting");
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v) fd.set(k, String(v));
    });
    const result = await submitPartnershipEnquiry(fd);
    if (result.ok) setState("success");
    else {
      setState("error");
      setErrorMsg(result.error);
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-sm border border-line bg-bone p-10 text-center">
        <CheckCircle2 className="mx-auto text-chocolate-soft mb-4" size={32} strokeWidth={1.5} />
        <h3 className="font-display text-xl mb-2">Enquiry sent</h3>
        <p className="text-sm text-chocolate/65 max-w-sm mx-auto">
          Thank you for reaching out — we&apos;ll be in touch soon to talk through
          collaborating with Rally.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="company">Company / brand</Label>
          <Input id="company" {...register("company")} aria-invalid={!!errors.company} />
          <FieldError message={errors.company?.message} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="businessType">Type of business</Label>
          <Input
            id="businessType"
            placeholder="e.g. Pilates studio, padel venue..."
            {...register("businessType")}
            aria-invalid={!!errors.businessType}
          />
          <FieldError message={errors.businessType?.message} />
        </div>
        <div>
          <Label htmlFor="collaborationType">Collaboration type</Label>
          <Select id="collaborationType" {...register("collaborationType")}>
            {COLLAB_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">Tell us about the collaboration</Label>
        <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
        <FieldError message={errors.message?.message} />
      </div>

      {state === "error" && (
        <p className="text-sm text-[#8a3b2e] bg-[#f5e5e0] border border-[#e0b8ab] rounded-sm px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button type="submit" disabled={state === "submitting"} size="lg" className="w-full sm:w-auto">
        {state === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>
    </form>
  );
}
