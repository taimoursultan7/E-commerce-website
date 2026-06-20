import { motion } from "framer-motion";
import { useUI } from "../../state/ui/UIContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useUI();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="group relative inline-flex h-10 w-[76px] items-center rounded-full p-1 outline-none transition focus-visible:ring-4 focus-visible:ring-[#D3D4C0]/30"
    >
      {/* Glass track */}
      <div
        className={
          "absolute inset-0 rounded-full border backdrop-blur-xl transition-all duration-500 " +
          (isDark
            ? "border-[#22d3ee]/30 bg-gradient-to-r from-[#020617]/70 via-[#0b1220]/70 to-[#0f172a]/70 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_10px_30px_rgba(0,0,0,0.55)]"
            : "border-[#f59e0b]/25 bg-gradient-to-r from-white via-[#e0f2fe]/70 to-[#fef3c7]/70 shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_10px_25px_rgba(15,23,42,0.12)]")
        }
      />

      {/* Animated glow */}
      <div
        className={
          "pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition duration-500 group-hover:opacity-100 " +
          (isDark
            ? "bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.45),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.35),transparent_60%)]")
        }
      />

      {/* Ripple */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 opacity-0 transition group-active:h-24 group-active:w-24 group-active:opacity-100" />
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={
          "relative z-10 grid h-8 w-8 place-items-center rounded-full border shadow-lg transition-all duration-500 " +
          (isDark
            ? "border-[#22d3ee]/40 bg-[#0b1220] text-[#67e8f9] shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_12px_30px_rgba(0,0,0,0.55)]"
            : "border-[#f59e0b]/30 bg-white text-[#f59e0b] shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_12px_30px_rgba(15,23,42,0.12)]")
        }
      >
        {isDark ? (
          // Sun icon (switch to light)
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // Moon icon (switch to dark)
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        )}
      </motion.div>

      {/* Spacer to help layout */}
      <div className="relative z-10 flex-1" />
    </button>
  );
}
