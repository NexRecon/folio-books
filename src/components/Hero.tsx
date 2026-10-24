import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BOOKS, type Book } from "../data/books";
import BookCover from "./BookCover";
import Rating from "./Rating";
import { money } from "../context/CartContext";

const featured = BOOKS.find((b) => b.featured) ?? BOOKS[0];

function TiltCard({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: 1100 }} className="mx-auto w-full max-w-sm">
      <motion.button
        ref={ref}
        onPointerMove={move} onPointerLeave={reset} onBlur={reset}
        onClick={() => onOpen(book)}
        aria-label={`Quick view: ${book.title} by ${book.author}`}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        className="glass block w-full rounded-[2rem] p-6 text-left shadow-2xl"
      >
        <div style={{ transform: "translateZ(50px)" }} className="mx-auto w-3/5 text-[clamp(11px,2.4vw,15px)]">
          <BookCover book={book} />
        </div>
        <div style={{ transform: "translateZ(30px)" }} className="mt-6">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-accent uppercase">
            <Sparkles aria-hidden size={14} /> Book of the week
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{book.title}</h3>
          <p className="text-sm text-muted">{book.author}</p>
          <div className="mt-3 flex items-center justify-between">
            <Rating value={book.rating} reviews={book.reviews} />
            <span className="font-semibold">{money(book.price)}</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

export default function Hero({ onOpen }: { onOpen: (b: Book) => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-40 size-[30rem] rounded-full bg-[#e8a54b]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="glass inline-flex rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-muted uppercase">
            Curated by readers · Instant delivery
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
            Books worth <em className="text-accent not-italic">staying up</em> for.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted text-pretty">
            Folio is a small digital shelf of novels, scholarship and technical craft. Every title is read and
            chosen by a person, never by an algorithm.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#catalog"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 font-semibold text-on-accent shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              Browse the catalog
              <ArrowRight aria-hidden size={18} className="transition group-hover:translate-x-1" />
            </a>
            <button onClick={() => onOpen(featured)}
              className="glass inline-flex min-h-12 items-center rounded-full px-7 font-semibold transition hover:-translate-y-0.5">
              Peek at this week&rsquo;s pick
            </button>
          </div>
          <dl className="mt-12 flex gap-10 text-sm">
            {[["12", "hand-picked titles"], ["4.6", "average rating"], ["0", "tracking cookies"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold">{n}</dt>
                <dd className="text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}>
          <TiltCard book={featured} onOpen={onOpen} />
        </motion.div>
      </div>
    </section>
  );
}
