function toGCalDate(dateStr: string, timeStr: string): string {
  // dateStr: YYYY-MM-DD, timeStr: HH:mm[:ss]
  const [h, m] = timeStr.split(":");
  return `${dateStr.replace(/-/g, "")}T${h.padStart(2, "0")}${m.padStart(2, "0")}00`;
}

export function googleCalendarUrl({
  title,
  description,
  location,
  date,
  startTime,
}: {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
}): string {
  const start = toGCalDate(date, startTime);
  // Default to a 2-hour block if no end time is known.
  const [h, m] = startTime.split(":");
  const endHour = (parseInt(h, 10) + 2) % 24;
  const end = toGCalDate(date, `${String(endHour).padStart(2, "0")}:${m}`);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
