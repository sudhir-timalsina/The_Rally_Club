export default function EventsLoading() {
  return (
    <div className="container-edit py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-beige rounded-sm" />
            <div className="mt-4 h-3 w-2/3 bg-beige rounded-sm" />
            <div className="mt-3 h-5 w-4/5 bg-beige rounded-sm" />
            <div className="mt-2 h-3 w-1/2 bg-beige rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
