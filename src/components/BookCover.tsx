import type { Book } from "../data/books";

/** A generated cover: no image files, so nothing to load and no layout shift. */
export default function BookCover({ book, className = "" }: { book: Book; className?: string }) {
  const [a, b] = book.cover;
  return (
    <div
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
      className={`grain relative aspect-[2/3] overflow-hidden rounded-r-md rounded-l-sm shadow-xl ${className}`}
      style={{ background: `linear-gradient(155deg, ${a} 0%, ${a} 55%, ${b}33 100%)`, color: b }}
    >
      {/* spine highlight */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-2.5 bg-black/25" />
      <span aria-hidden className="absolute inset-y-0 left-2.5 w-px bg-white/20" />
      <div className="relative flex h-full flex-col justify-between p-[9%] pl-[14%]">
        <p className="text-[0.55em] font-semibold tracking-[0.2em] uppercase opacity-80">{book.category}</p>
        <div>
          <span aria-hidden className="mb-[6%] block h-px w-1/4" style={{ background: b }} />
          <p className="font-display text-[1.25em] leading-[1.1] font-semibold text-balance">{book.title}</p>
        </div>
        <p className="text-[0.62em] tracking-wide opacity-90">{book.author}</p>
      </div>
    </div>
  );
}
