"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Label, Input, Textarea, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setState("submitting");
    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("email", values.email);
    if (values.subject) fd.set("subject", values.subject);
    fd.set("message", values.message);

    const result = await submitContactForm(fd);
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
        <h3 className="font-display text-xl mb-2">Message sent</h3>
        <p className="text-sm text-chocolate/65">
          Thanks for reaching out — we&apos;ll get back to you as soon as we can.
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Subject (optional)</Label>
        <Input id="subject" {...register("subject")} />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
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
          "Send Message"
        )}
      </Button>
    </form>
  );
}
