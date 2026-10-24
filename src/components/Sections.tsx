import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Download, HeartHandshake, Mail, Quote } from "lucide-react";
import { spotlight } from "../hooks/fx";

const WORDS = ["Novels", "Scholarship", "Technical craft", "Essays", "First editions of tomorrow", "Read by humans"];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div aria-hidden className="marquee overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex gap-10 font-display text-3xl text-muted italic md:text-4xl">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10">
                {w}<span className="text-gold not-italic">&#10086;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const reasons = [
  { icon: BookOpenCheck, title: "Read before it is listed", text: "A human reads every title end to end. If it does not earn a place on the shelf, it does not appear." },
  { icon: Download, title: "Yours to keep", text: "ePub and PDF, no DRM. Read it on any device, today or in twenty years." },
  { icon: HeartHandshake, title: "Authors paid first", text: "70% of every sale goes straight to the writer. We keep the rest to keep the lights on." },
];

export function Why() {
  return (
    <section id="why" aria-labelledby="why-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">The Folio promise</p>
      <h2 id="why-h" className="mt-2 font-display text-4xl font-semibold tracking-tight">Why Folio</h2>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <motion.li key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.12, duration: 0.6 }}
            onPointerMove={spotlight}
            className="spot glass rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/15">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent/12 text-accent"><Icon aria-hidden size={24} /></span>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted">{text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

const quotes = [
  { q: "The only store where I trust the recommendations. I have not been disappointed once.", who: "Nadia, reads 60 books a year" },
  { q: "DRM-free and fairly priced. I finally own a library again, not a licence.", who: "Tobias, software engineer" },
  { q: "I found my favourite novel of the decade on the shelf here, by a writer I had never heard of.", who: "Amira, book-club host" },
];

export function Readers() {
  return (
    <section id="readers" aria-labelledby="readers-h" className="grain relative isolate overflow-hidden px-5 py-24 text-[#fbeee6]"
      style={{ background: "linear-gradient(160deg, #2a0b17 0%, #4b1226 60%, #5e1a30 100%)" }}>
      <div aria-hidden className="drift-slow pointer-events-none absolute -top-32 left-1/3 -z-10 size-96 rounded-full bg-[#d9b26a]/15 blur-3xl" />
      <div className="relative z-[2] mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#e6c27a] uppercase">In their words</p>
        <h2 id="readers-h" className="mt-2 font-display text-4xl font-semibold tracking-tight">What readers say</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map(({ q, who }, i) => (
            <motion.li key={who} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-3xl border border-[#e6c27a]/25 bg-white/5 p-7 backdrop-blur-md transition hover:-translate-y-1.5 hover:bg-white/10">
              <Quote aria-hidden size={28} className="text-[#e6c27a]" />
              <blockquote className="mt-4 font-display text-lg leading-relaxed">{q}</blockquote>
              <p className="mt-5 text-sm text-[#dcbfba]">{who}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <section id="newsletter" aria-labelledby="news-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center shadow-xl sm:px-12">
        <div aria-hidden className="drift absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-on-accent shadow-lg shadow-accent/30"><Mail aria-hidden size={26} /></span>
          <h2 id="news-h" className="mt-5 font-display text-3xl font-semibold">One good book, every Friday.</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">A short note from the shelf. No tracking, unsubscribe in one click.</p>
          {sent ? (
            <p role="status" className="mt-8 font-semibold text-accent">You&rsquo;re on the list. See you Friday.</p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="min-h-12 flex-1 rounded-full border border-line bg-bg px-5 text-base text-fg placeholder:text-muted" />
              <button className="min-h-12 rounded-full bg-accent px-6 font-semibold text-on-accent transition hover:brightness-110 active:scale-95">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-muted sm:flex-row">
        <p className="font-display text-lg text-fg">Folio <span className="text-gold">&#10086;</span></p>
        <p>A demo storefront. Titles and authors are fictional.</p>
      </div>
    </footer>
  );
}
