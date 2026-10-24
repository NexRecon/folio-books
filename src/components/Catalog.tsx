import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { BOOKS, CATEGORIES, type Book } from "../data/books";
import BookCard from "./BookCard";

export default function Catalog({ onOpen }: { onOpen: (b: Book) => void }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const deferred = useDeferredValue(query);

  // Simulate a network round-trip so the loading state is part of the showcase.
  useEffect(() => {
    setSearching(true);
    const t = setTimeout(() => setSearching(false), 280);
    return () => clearTimeout(t);
  }, [deferred, category]);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return BOOKS.filter((b) =>
      (category === "All" || b.category === category) &&
      (!q || `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q)));
  }, [deferred, category]);

  return (
    <section id="catalog" aria-labelledby="catalog-h" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <h2 id="catalog-h" className="font-display text-4xl font-semibold tracking-tight">The shelf</h2>
      <p className="mt-2 text-muted">Filter by genre or search by title and author.</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}
              className={`relative min-h-11 rounded-full px-5 text-sm font-semibold transition ${
                category === c ? "text-on-accent" : "border border-line text-muted hover:text-fg"}`}>
              {category === c && (
                <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-xs">
          <Search aria-hidden size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <label htmlFor="search" className="sr-only">Search books</label>
          <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books or authors"
            className="glass min-h-11 w-full rounded-full py-2 pr-11 pl-11 text-base placeholder:text-muted" />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search"
              className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-full hover:bg-line/60">
              <X aria-hidden size={16} />
            </button>
          )}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted">
        {searching ? "Searching…" : `${results.length} ${results.length === 1 ? "book" : "books"}`}
      </p>

      {searching ? (
        <ul aria-hidden className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className="h-96 animate-pulse rounded-3xl border border-line bg-surface" />
          ))}
        </ul>
      ) : results.length ? (
        <motion.ul layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((b) => <BookCard key={b.id} book={b} onOpen={onOpen} />)}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-line py-20 text-center">
          <p className="font-display text-2xl">Nothing on the shelf matches &ldquo;{query}&rdquo;.</p>
          <button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-4 font-semibold text-accent underline underline-offset-4">
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
