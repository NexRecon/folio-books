import { Check, ShoppingBag } from "lucide-react";
import type { Book } from "../data/books";
import Drawer from "./Drawer";
import BookCover from "./BookCover";
import Rating from "./Rating";
import { money, useCart } from "../context/CartContext";

interface Props { book: Book | null; onClose: () => void; onOpenCart: () => void }

export default function BookDrawer({ book, onClose, onOpenCart }: Props) {
  const { add, qtyOf } = useCart();
  const qty = book ? qtyOf(book.id) : 0;

  return (
    <Drawer open={!!book} onClose={onClose} title="Quick view"
      footer={book && (
        <div className="flex items-center gap-3">
          <button onClick={() => add(book.id)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-on-accent transition hover:brightness-110 active:scale-[0.98]">
            {qty > 0 ? <Check aria-hidden size={18} /> : <ShoppingBag aria-hidden size={18} />}
            {qty > 0 ? `Added (${qty}) — add another` : `Add to cart · ${money(book.price)}`}
          </button>
          {qty > 0 && (
            <button onClick={() => { onClose(); onOpenCart(); }}
              className="min-h-12 rounded-full border border-line px-5 font-semibold transition hover:bg-line/50">View cart</button>
          )}
        </div>
      )}>
      {book && (
        <article>
          <div className="mx-auto w-40 text-[11px]"><BookCover book={book} /></div>
          <p className="mt-6 text-xs font-semibold tracking-widest text-accent uppercase">{book.category}</p>
          <h3 className="font-display text-3xl leading-tight font-semibold text-balance">{book.title}</h3>
          <p className="text-muted">by {book.author}</p>
          <div className="mt-3"><Rating value={book.rating} reviews={book.reviews} /></div>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            {[["Pages", book.pages], ["Published", book.year], ["Format", "ePub · PDF"]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-bg py-3">
                <dt className="text-xs text-muted">{k}</dt><dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <h4 className="mt-7 font-display text-lg font-semibold">About the book</h4>
          <p className="mt-1 text-muted text-pretty">{book.summary}</p>
          <h4 className="mt-6 font-display text-lg font-semibold">About the author</h4>
          <p className="mt-1 text-muted text-pretty">{book.authorBio}</p>
        </article>
      )}
    </Drawer>
  );
}
