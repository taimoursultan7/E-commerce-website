import { useState } from "react";

const faqs = [
  {
    q: "Is this a real payment system?",
    a: "No — this is a demo checkout. Do not enter real card details.",
  },
  {
    q: "Does this include product search & filtering?",
    a: "Yes. The Shop page supports keyword search, category filtering, and max price filtering.",
  },
  {
    q: "Is there a wishlist and cart with quantity controls?",
    a: "Yes. Wishlist and cart are stored locally and persist across refresh.",
  },
  {
    q: "Is the UI responsive and SEO-friendly?",
    a: "Yes. It's responsive across devices and includes semantic page structure with proper headings.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Quick answers about shipping, orders, and product browsing.
        </p>

        <div className="mt-8 space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={f.q}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <div className="text-sm font-semibold">{f.q}</div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {isOpen ? "−" : "+"}
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
