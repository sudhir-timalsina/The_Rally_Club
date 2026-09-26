"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Minus, Plus, ShieldCheck } from "lucide-react";
import { Label, Input, Textarea, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { formatGBP } from "@/lib/utils";
import { createBookingCheckout } from "@/lib/actions/checkout";

export function BookingWidget({
  eventId,
  pricePence,
  spacesLeft,
}: {
  eventId: string;
  pricePence: number;
  spacesLeft: number | null;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const maxQty = Math.min(10, spacesLeft ?? 10);
  const total = pricePence * quantity;
  const isFree = pricePence === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the booking policy to continue.");
      return;
    }
    setState("submitting");
    setError("");

    const fd = new FormData();
    fd.set("eventId", eventId);
    fd.set("fullName", fullName);
    fd.set("email", email);
    if (phone) fd.set("phone", phone);
    fd.set("quantity", String(quantity));
    if (notes) fd.set("notes", notes);
    fd.set("agreedToTerms", "on");

    const result = await createBookingCheckout(fd);

    if (!result.ok) {
      setState("error");
      setError(result.error);
      return;
    }

    if (result.free) {
      router.push(`/events/${result.eventSlug}/confirmation?ref=${result.reference}`);
    } else {
      window.location.href = result.url;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Quantity + live total */}
      <div className="flex items-center justify-between rounded-sm bg-bone border border-line px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-label text-taupe-dark mb-1">Spaces</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center disabled:opacity-30 hover:bg-beige/60"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center font-display text-lg">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              disabled={quantity >= maxQty}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center disabled:opacity-30 hover:bg-beige/60"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-label text-taupe-dark mb-1">Total</p>
          <p className="font-display text-2xl">{formatGBP(total)}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="notes">Anything we should know? (optional)</Label>
        <Textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-chocolate/75">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="accent-chocolate mt-0.5"
        />
        I agree to The Rally Club&apos;s{" "}
        <a href="/legal/terms" target="_blank" className="underline">
          terms and booking policy
        </a>
        .
      </label>

      {error && <FieldError message={error} />}

      <Button type="submit" disabled={state === "submitting"} size="lg" className="w-full">
        {state === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Please wait...
          </>
        ) : isFree ? (
          "Reserve My Free Spot"
        ) : (
          <>Continue to Payment — {formatGBP(total)}</>
        )}
      </Button>

      {!isFree && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-chocolate/45">
          <ShieldCheck size={13} /> Secure payment via Stripe. Card details never touch our servers.
        </p>
      )}
    </form>
  );
}
