export function RatingStars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const Star = ({ fill }: { fill: "full" | "half" | "empty" }) => {
    const common = "h-4 w-4";
    if (fill === "full")
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.3 18.2 21l-1.6-7L22 9.3l-7.2-.6L12 2 9.2 8.7 2 9.3 7.4 14 5.8 21z" />
        </svg>
      );
    if (fill === "half")
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2v15.3L5.8 21l1.6-7L2 9.3l7.2-.6z" />
          <path
            d="M12 17.3 18.2 21l-1.6-7L22 9.3l-7.2-.6L12 2z"
            fill="currentColor"
            opacity="0.25"
          />
        </svg>
      );
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 17.3 18.2 21l-1.6-7L22 9.3l-7.2-.6L12 2 9.2 8.7 2 9.3 7.4 14 5.8 21z" />
      </svg>
    );
  };

  return (
    <div className={`inline-flex items-center gap-1 text-amber-500 ${className ?? ""}`}
      aria-label={`Rating ${rating} out of 5`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} fill="full" />
      ))}
      {half && <Star fill="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} fill="empty" />
      ))}
    </div>
  );
}
