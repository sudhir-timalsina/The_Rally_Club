import { getPartnerEnquiriesAdmin } from "@/lib/admin-data";
import { PartnerRow } from "@/components/admin/partner-row";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const enquiries = await getPartnerEnquiriesAdmin();

  return (
    <div>
      <p className="eyebrow mb-2">Manage</p>
      <h1 className="font-display text-3xl mb-8">Partnership Enquiries</h1>

      {enquiries.length === 0 ? (
        <div className="bg-bone border border-dashed border-line rounded-sm p-16 text-center text-chocolate/60">
          No partnership enquiries yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {enquiries.map((e) => (
            <PartnerRow key={e.id} enquiry={e} />
          ))}
        </div>
      )}
    </div>
  );
}
