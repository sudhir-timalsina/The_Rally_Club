"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, UploadCloud, X } from "lucide-react";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/site-config";
import type { RallyEvent } from "@/types";
import { createEvent, updateEvent } from "@/lib/actions/admin-events";

export function EventForm({ event }: { event?: RallyEvent }) {
  const router = useRouter();
  const isEdit = Boolean(event);
  const [imageUrl, setImageUrl] = useState(event?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `events/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(path, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("event-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (err) {
      console.error(err);
      setError(
        "Image upload failed. Make sure the 'event-images' storage bucket exists (see README) and try again."
      );
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setError("");
    formData.set("imageUrl", imageUrl);

    const result = isEdit
      ? await updateEvent(event!.id, formData)
      : await createEvent(formData);

    if (result.ok) {
      router.push("/admin/dashboard/events");
      router.refresh();
    } else {
      setError(result.error);
      setSubmitting(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-8 max-w-3xl">
      {/* Image */}
      <div>
        <Label>Event image</Label>
        {imageUrl ? (
          <div className="relative w-full max-w-sm aspect-[4/3] rounded-sm overflow-hidden border border-line">
            <Image src={imageUrl} alt="Event" fill className="object-cover" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 bg-chocolate text-cream rounded-full p-1.5"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 w-full max-w-sm aspect-[4/3] rounded-sm border border-dashed border-line bg-bone cursor-pointer hover:border-chocolate/40 transition-colors">
            {uploading ? (
              <Loader2 size={20} className="animate-spin text-taupe-dark" />
            ) : (
              <>
                <UploadCloud size={20} className="text-taupe-dark" />
                <span className="text-xs text-chocolate/60">Click to upload</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={event?.title} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select id="category" name="category" defaultValue={event?.category || "social"}>
            {siteConfig.categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" name="status" defaultValue={event?.status || "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="sold_out">Sold Out</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Short excerpt (optional, used in previews)</Label>
        <Input id="excerpt" name="excerpt" defaultValue={event?.excerpt || ""} maxLength={160} />
      </div>

      <div>
        <Label htmlFor="description">Full description</Label>
        <Textarea id="description" name="description" rows={6} defaultValue={event?.description} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="locationName">Venue name</Label>
          <Input id="locationName" name="locationName" defaultValue={event?.location_name} required />
        </div>
        <div>
          <Label htmlFor="locationArea">Area (e.g. Wilmslow, Cheshire)</Label>
          <Input id="locationArea" name="locationArea" defaultValue={event?.location_area} required />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Full address (optional)</Label>
          <Input id="address" name="address" defaultValue={event?.address || ""} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <Label htmlFor="eventDate">Date</Label>
          <Input id="eventDate" name="eventDate" type="date" defaultValue={event?.event_date} required />
        </div>
        <div>
          <Label htmlFor="startTime">Start time</Label>
          <Input id="startTime" name="startTime" type="time" defaultValue={event?.start_time?.slice(0, 5)} required />
        </div>
        <div>
          <Label htmlFor="endTime">End time (optional)</Label>
          <Input id="endTime" name="endTime" type="time" defaultValue={event?.end_time?.slice(0, 5) || ""} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="pricePence">Price (GBP, e.g. 15.00 — use 0 for free)</Label>
          <Input
            id="pricePenceDisplay"
            name="pricePenceDisplay"
            type="number"
            step="0.01"
            min="0"
            defaultValue={event ? (event.price_pence / 100).toFixed(2) : "0"}
            onChange={(e) => {
              const hidden = document.getElementById("pricePence") as HTMLInputElement;
              if (hidden) hidden.value = String(Math.round(parseFloat(e.target.value || "0") * 100));
            }}
          />
          <input type="hidden" id="pricePence" name="pricePence" defaultValue={event?.price_pence ?? 0} />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity (optional)</Label>
          <Input id="capacity" name="capacity" type="number" min="1" defaultValue={event?.capacity ?? ""} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="hostName">Host / instructor (optional)</Label>
          <Input id="hostName" name="hostName" defaultValue={event?.host_name || ""} />
        </div>
        <div>
          <Label htmlFor="hostBio">Host bio (optional)</Label>
          <Input id="hostBio" name="hostBio" defaultValue={event?.host_bio || ""} />
        </div>
      </div>

      <div className="border border-line rounded-sm p-5 bg-bone">
        <p className="text-sm font-medium mb-1">Booking</p>
        <p className="text-xs text-chocolate/55 mb-4">
          Every event now books natively on the Rally site. Free events (£0)
          confirm instantly; paid events go through Stripe Checkout.
        </p>
        <label className="flex items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            name="bookingOpen"
            defaultChecked={event?.booking_open ?? true}
            className="accent-chocolate"
          />
          Booking is open for this event
        </label>
      </div>

      <label className="flex items-center gap-2.5 text-sm">
        <input type="checkbox" name="isFeatured" defaultChecked={event?.is_featured} className="accent-chocolate" />
        Feature this event on the homepage
      </label>

      {error && <FieldError message={error} />}

      <div className="flex gap-3 pt-4 border-t border-line">
        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? <Loader2 size={16} className="animate-spin" /> : isEdit ? "Save Changes" : "Create Event"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push("/admin/dashboard/events")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
