import type { Book } from "../data/books";

/** A generated cover: no image files, so nothing to load and no layout shift. */
export default function BookCover({ book, className = "" }: { book: Book; className?: string }) {
  const [a, b] = book.cover;
  return (
    <div
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
      className={`grain shine relative aspect-[2/3] overflow-hidden rounded-r-md rounded-l-sm shadow-[0_18px_40px_-12px_rgb(40_8_20/0.55)] ${className}`}
      style={{
        background: `radial-gradient(120% 80% at 80% 0%, ${b}22 0%, transparent 55%), linear-gradient(160deg, ${a} 0%, #12060b 140%)`,
        color: b,
      }}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-2.5 bg-black/30" />
      <span aria-hidden className="absolute inset-y-0 left-2.5 w-px bg-white/25" />
      {/* inner foil frame */}
      <span aria-hidden className="absolute inset-[7%] left-[13%] rounded-[2px] border" style={{ borderColor: `${b}55` }} />
      <div className="relative z-[3] flex h-full flex-col justify-between p-[11%] pl-[18%] text-center">
        <p className="text-[0.52em] font-semibold tracking-[0.28em] uppercase opacity-80">{book.category}</p>
        <div>
          <span aria-hidden className="mx-auto mb-[8%] block h-px w-1/3" style={{ background: b }} />
          <p className="font-display text-[1.2em] leading-[1.12] font-semibold text-balance">{book.title}</p>
        </div>
        <p className="text-[0.58em] tracking-[0.12em] uppercase opacity-90">{book.author}</p>
      </div>
    </div>
  );
}
