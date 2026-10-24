import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BOOKS, type Book } from "../data/books";
import BookCover from "./BookCover";
import Rating from "./Rating";
import { money } from "../context/CartContext";
import { CountUp, Magnetic } from "../hooks/fx";

const featured = BOOKS.find((b) => b.featured) ?? BOOKS[0];
const backdrop = [BOOKS.find((b) => b.id === "quiet-orchard")!, BOOKS.find((b) => b.id === "systems-that-last")!];
const HEADLINE = ["Books", "worth", "staying", "up", "for."];

function TiltCard({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(420px circle at ${gx} ${gy}, rgb(255 236 200 / 0.28), transparent 55%)`);

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: 1100 }} className="relative mx-auto w-full max-w-sm">
      {/* two books peeking out behind the spotlight card */}
      <div aria-hidden className="float absolute -top-6 -left-8 w-28 -rotate-12 text-[8px] opacity-90 max-sm:hidden"><BookCover book={backdrop[0]} /></div>
      <div aria-hidden className="float absolute -right-8 -bottom-6 w-28 rotate-12 text-[8px] opacity-90 max-sm:hidden" style={{ animationDelay: "-3s" }}><BookCover book={backdrop[1]} /></div>
      <motion.button
        ref={ref}
        onPointerMove={move} onPointerLeave={reset} onBlur={reset}
        onClick={() => onOpen(book)}
        aria-label={`Quick view: ${book.title} by ${book.author}`}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        className="relative block w-full overflow-hidden rounded-[2rem] border border-[#e6c27a]/30 bg-[#fffaf6]/10 p-6 text-left text-[#fbeee6] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
      >
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ background: glare }} />
        <div style={{ transform: "translateZ(50px)" }} className="mx-auto w-3/5 text-[clamp(11px,2.4vw,15px)]">
          <BookCover book={book} />
        </div>
        <div style={{ transform: "translateZ(30px)" }} className="mt-6">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#e6c27a] uppercase">
            <Sparkles aria-hidden size={14} /> Book of the week
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{book.title}</h3>
          <p className="text-sm text-[#e9cfc9]">{book.author}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="[&_*]:!text-[#fbeee6] [&_svg]:!fill-[#e6c27a] [&_svg]:!text-[#e6c27a]"><Rating value={book.rating} reviews={book.reviews} /></span>
            <span className="font-semibold text-[#e6c27a]">{money(book.price)}</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

export default function Hero({ onOpen }: { onOpen: (b: Book) => void }) {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 120]);
  const blobY2 = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section id="top" className="grain relative isolate overflow-hidden text-[#fbeee6]"
      style={{ background: "linear-gradient(135deg, #230915 0%, #4b1226 48%, #7a1f3d 100%)" }}>
      <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -top-40 -right-32 -z-10">
        <div className="drift size-[34rem] rounded-full bg-[#e0789a]/25 blur-3xl" />
      </motion.div>
      <motion.div aria-hidden style={{ y: blobY2 }} className="pointer-events-none absolute -bottom-52 -left-40 -z-10">
        <div className="drift-slow size-[30rem] rounded-full bg-[#d9b26a]/20 blur-3xl" />
      </motion.div>

      <div className="relative z-[2] mx-auto grid max-w-6xl items-center gap-16 px-5 pt-16 pb-32 md:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex rounded-full border border-[#e6c27a]/40 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#e6c27a] uppercase backdrop-blur">
            Curated by readers · Instant delivery
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.2rem)] leading-[1.04] font-semibold tracking-tight">
            {HEADLINE.map((w, i) => (
              <span key={w} className="mr-[0.24em] inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`inline-block ${i === 2 || i === 3 ? "text-[#e6c27a] italic" : ""}`}
                  initial={{ y: "115%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg text-[#ecd5d0] text-pretty">
            Folio is a small digital shelf of novels, scholarship and technical craft. Every title is read and
            chosen by a person, never by an algorithm.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#catalog"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e6c27a] px-7 font-semibold text-[#2a0b17] shadow-[0_10px_30px_-8px_rgb(230_194_122/0.6)] transition hover:brightness-110">
                Browse the catalog
                <ArrowRight aria-hidden size={18} className="transition group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={() => onOpen(featured)}
                className="inline-flex min-h-12 items-center rounded-full border border-[#e6c27a]/50 bg-white/5 px-7 font-semibold text-[#fbeee6] backdrop-blur transition hover:bg-white/10">
                Peek at this week&rsquo;s pick
              </button>
            </Magnetic>
          </motion.div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-14 flex gap-10 text-sm">
            <div><dt className="font-display text-3xl font-semibold text-[#e6c27a]"><CountUp to={12} /></dt><dd className="text-[#dcbfba]">hand-picked titles</dd></div>
            <div><dt className="font-display text-3xl font-semibold text-[#e6c27a]"><CountUp to={4.6} decimals={1} /></dt><dd className="text-[#dcbfba]">average rating</dd></div>
            <div><dt className="font-display text-3xl font-semibold text-[#e6c27a]"><CountUp to={70} suffix="%" /></dt><dd className="text-[#dcbfba]">goes to authors</dd></div>
          </motion.dl>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
          <TiltCard book={featured} onOpen={onOpen} />
        </motion.div>
      </div>

      {/* curved edge into the page background */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[-1px] z-[2] h-14 w-full text-bg">
        <path fill="currentColor" d="M0 80V30C240 80 480 0 720 25s480 55 720 5v50z" />
      </svg>
    </section>
  );
}
