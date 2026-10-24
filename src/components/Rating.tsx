import { Star } from "lucide-react";

export default function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <Star aria-hidden size={15} className="fill-accent text-accent" />
      <span className="font-medium text-fg">{value.toFixed(1)}</span>
      <span className="sr-only">out of 5 stars</span>
      {reviews !== undefined && <span aria-label={`${reviews} reviews`}>({reviews.toLocaleString("en-US")})</span>}
    </span>
  );
}
