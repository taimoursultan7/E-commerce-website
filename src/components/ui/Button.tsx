import { cn } from "../../utils/cn";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#D3D4C0]/60 disabled:cursor-not-allowed disabled:opacity-60";
  const variants: Record<string, string> = {
    primary: "bg-[#D3D4C0] text-slate-900 shadow-sm hover:shadow-md", 
    secondary:
      "border border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
    ghost:
      "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900",
    danger:
      "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-500/40",
  };
  const sizes: Record<string, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <button
      {...props}
      className={cn(base, variants[variant], sizes[size], className)}
    />
  );
}
