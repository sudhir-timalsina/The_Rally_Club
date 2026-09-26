import { getContactMessagesAdmin } from "@/lib/admin-data";
import { MessageRow } from "@/components/admin/message-row";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessagesAdmin();

  return (
    <div>
      <p className="eyebrow mb-2">Manage</p>
      <h1 className="font-display text-3xl mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-bone border border-dashed border-line rounded-sm p-16 text-center text-chocolate/60">
          No messages yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
        </div>
      )}
    </div>
  );
}
