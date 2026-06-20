type Props = { name: string; className?: string };

export function Icon({ name, className }: Props) {
  const common = "stroke-current";
  const cls = `${common} ${className ?? ""}`;

  switch (name) {
    case "search":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20" />
        </svg>
      );
  }
}
