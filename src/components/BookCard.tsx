import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { Book } from "../data/books";
import BookCover from "./BookCover";
import Rating from "./Rating";
import { money, useCart } from "../context/CartContext";
import { spotlight } from "../hooks/fx";

export default function BookCard({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) {
  const { qtyOf, add } = useCart();
  const inCart = qtyOf(book.id) > 0;

  return (
    <motion.li layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onPointerMove={spotlight}
      className="spot group flex flex-col rounded-3xl border border-line bg-surface p-4 transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/20">
      <button onClick={() => onOpen(book)} aria-label={`Quick view: ${book.title}`}
        className="rounded-2xl bg-bg px-8 py-6 transition-colors group-hover:bg-line/40">
        <div className="mx-auto w-full max-w-[9.5rem] text-[11px] transition duration-300 group-hover:scale-105 group-hover:-rotate-1">
          <BookCover book={book} />
        </div>
      </button>
      <div className="mt-4 flex flex-1 flex-col px-1">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">{book.category}</p>
        <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-balance">{book.title}</h3>
        <p className="text-sm text-muted">{book.author}</p>
        <div className="mt-3"><Rating value={book.rating} reviews={book.reviews} /></div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold">{money(book.price)}</span>
          <button onClick={() => add(book.id)} aria-label={`${inCart ? "Add another copy of" : "Add"} ${book.title} to cart`}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition active:scale-95 ${
              inCart ? "bg-accent/15 text-accent" : "bg-accent text-on-accent hover:brightness-110"}`}>
            {inCart ? <Check aria-hidden size={16} /> : <Plus aria-hidden size={16} />}
            {inCart ? `In cart (${qtyOf(book.id)})` : "Add"}
          </button>
        </div>
      </div>
    </motion.li>
  );
}
