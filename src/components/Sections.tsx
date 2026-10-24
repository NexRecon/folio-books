import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Download, HeartHandshake, Mail } from "lucide-react";

const reasons = [
  { icon: BookOpenCheck, title: "Read before it is listed", text: "A human reads every title end to end. If it does not earn a place on the shelf, it does not appear." },
  { icon: Download, title: "Yours to keep", text: "ePub and PDF, no DRM. Read it on any device, today or in twenty years." },
  { icon: HeartHandshake, title: "Authors paid first", text: "70% of every sale goes straight to the writer. We keep the rest to keep the lights on." },
];

export function Why() {
  return (
    <section id="why" aria-labelledby="why-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <h2 id="why-h" className="font-display text-4xl font-semibold tracking-tight">Why Folio</h2>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <motion.li key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-3xl p-7 transition hover:-translate-y-1">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent"><Icon aria-hidden size={24} /></span>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted">{text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <section id="newsletter" aria-labelledby="news-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-fg px-6 py-14 text-center text-bg sm:px-12">
        <div aria-hidden className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative">
          <Mail aria-hidden className="mx-auto" size={30} />
          <h2 id="news-h" className="mt-4 font-display text-3xl font-semibold">One good book, every Friday.</h2>
          <p className="mx-auto mt-2 max-w-md opacity-80">A short note from the shelf. No tracking, unsubscribe in one click.</p>
          {sent ? (
            <p role="status" className="mt-8 font-semibold">You&rsquo;re on the list. See you Friday.</p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="min-h-12 flex-1 rounded-full bg-bg px-5 text-base text-fg placeholder:text-muted" />
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
        <p className="font-display text-base text-fg">Folio</p>
        <p>A demo storefront. Titles and authors are fictional.</p>
      </div>
    </footer>
  );
}
