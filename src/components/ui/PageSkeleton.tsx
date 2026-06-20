export function PageSkeleton() {
  return (
    <div className="min-h-[70vh] bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-1/3 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
