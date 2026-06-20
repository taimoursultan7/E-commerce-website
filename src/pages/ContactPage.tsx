import toast from "react-hot-toast";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Have a question about an order, product, or partnership? Send us a message.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Email:</span> taimoursultan07@gmail.com
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Phone:</span> +92 (3490799233)
                </div>
                
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Hours:</span> Mon–Fri, 9am–6pm
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent! We'll reply shortly.");
            }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-sm font-semibold">Send a message</div>
            <div className="mt-4 space-y-3">
              <Input placeholder="Full name" required />
              <Input placeholder="Email" type="email" required />
              <Input placeholder="Subject" required />
              <textarea
                required
                placeholder="Your message"
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-500"
              />
              <Button size="lg" className="w-full" type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
