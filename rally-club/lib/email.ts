import { Resend } from "resend";
import { formatEventDate, formatEventTime, formatGBP } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type NotificationPayload = {
  type: "contact" | "partnership";
  subject: string;
  data: Record<string, unknown>;
};

/**
 * Sends an internal notification email whenever a form is submitted.
 * Fails soft: if RESEND_API_KEY or NOTIFICATION_EMAIL_TO isn't set yet,
 * this logs to the console instead of throwing, so form submissions still
 * succeed (and are still saved to Supabase) before email is configured.
 *
 * To go live: set RESEND_API_KEY, NOTIFICATION_EMAIL_FROM and
 * NOTIFICATION_EMAIL_TO in your environment (see .env.example), and verify
 * your sending domain in the Resend dashboard.
 */
export async function sendNotificationEmail(payload: NotificationPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const from = process.env.NOTIFICATION_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.info(
      `[email] Skipped (Resend not configured). Would have sent "${payload.subject}":`,
      payload.data
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const rows = Object.entries(payload.data)
      .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#8C7A6C;font-family:sans-serif;font-size:13px;">${key}</td><td style="padding:4px 0;font-family:sans-serif;font-size:13px;color:#3D2A22;">${String(value)}</td></tr>`)
      .join("");

    await resend.emails.send({
      from,
      to,
      subject: `The Rally Club — ${payload.subject}`,
      html: `
        <div style="font-family: sans-serif; background:#F7F1E8; padding:32px;">
          <div style="max-width:520px;margin:0 auto;background:#FCFAF6;border:1px solid #e5d5c5;border-radius:8px;padding:24px;">
            <h2 style="font-family: serif; color:#3D2A22; margin-top:0;">${payload.subject}</h2>
            <table>${rows}</table>
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Never let an email failure break the form submission — the data is
    // already safely stored in Supabase by the time this is called.
    console.error("[email] Resend send failed:", err);
  }
}

type BookingConfirmationInput = {
  booking: {
    booking_reference: string;
    full_name: string;
    email: string;
    attendees: number;
    amount_pence: number;
    currency: string;
  };
  event: {
    title: string;
    location_name: string;
    location_area: string;
    event_date: string;
    start_time: string;
  };
};

/**
 * Sends the "You're booked!" confirmation email once a booking has been
 * confirmed (either immediately for free events, or from the verified
 * Stripe webhook for paid events). Fails soft, matching sendNotificationEmail.
 */
export async function sendBookingConfirmationEmail({ booking, event }: BookingConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFICATION_EMAIL_FROM;

  if (!apiKey || !from) {
    console.info(
      `[email] Skipped booking confirmation (Resend not configured) for ${booking.booking_reference}`
    );
    return;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(
    `RALLY-CHECKIN:${booking.booking_reference}`
  )}`;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: booking.email,
      subject: `You're booked! ${event.title} — ${siteConfig.name}`,
      html: `
        <div style="font-family: Georgia, serif; background:#F7F1E8; padding:32px;">
          <div style="max-width:480px;margin:0 auto;background:#FCFAF6;border:1px solid #e5d5c5;border-radius:8px;overflow:hidden;">
            <div style="background:#3D2A22;color:#F7F1E8;padding:28px 32px;text-align:center;">
              <p style="text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#CBBBAF;margin:0 0 6px;font-family:Arial,sans-serif;">The Rally Club</p>
              <h1 style="margin:0;font-size:26px;">You&rsquo;re booked!</h1>
            </div>
            <div style="padding:28px 32px;font-family:Arial,sans-serif;color:#3D2A22;">
              <p style="font-size:15px;">Hi ${booking.full_name.split(" ")[0]},</p>
              <p style="font-size:15px;line-height:1.6;">Your spot at <strong>${event.title}</strong> is confirmed. Here are the details:</p>
              <table style="width:100%;font-size:14px;margin:20px 0;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#8C7A6C;">Date</td><td style="padding:6px 0;text-align:right;">${formatEventDate(event.event_date)}</td></tr>
                <tr><td style="padding:6px 0;color:#8C7A6C;">Time</td><td style="padding:6px 0;text-align:right;">${formatEventTime(event.start_time)}</td></tr>
                <tr><td style="padding:6px 0;color:#8C7A6C;">Location</td><td style="padding:6px 0;text-align:right;">${event.location_name}, ${event.location_area}</td></tr>
                <tr><td style="padding:6px 0;color:#8C7A6C;">Spaces</td><td style="padding:6px 0;text-align:right;">${booking.attendees}</td></tr>
                <tr><td style="padding:6px 0;color:#8C7A6C;">Amount paid</td><td style="padding:6px 0;text-align:right;">${formatGBP(booking.amount_pence)}</td></tr>
              </table>
              <div style="text-align:center;margin:24px 0;">
                <img src="${qrUrl}" width="140" height="140" alt="Booking QR code" style="border-radius:6px;" />
                <p style="font-family:monospace;font-size:15px;letter-spacing:1px;margin-top:10px;">${booking.booking_reference}</p>
                <p style="font-size:12px;color:#8C7A6C;">Show this at check-in</p>
              </div>
              <p style="font-size:13px;color:#8C7A6C;line-height:1.6;">Questions before the event? Just reply to this email or reach us on Instagram ${siteConfig.contact.instagramHandle}.</p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] Booking confirmation send failed:", err);
  }
}
