import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Drawer from "./Drawer";
import BookCover from "./BookCover";
import { money, useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, count, total, setQty, remove, clear } = useCart();
  const [done, setDone] = useState(false);

  const close = () => { setDone(false); onClose(); };
  const checkout = () => { clear(); setDone(true); };

  return (
    <Drawer open={open} onClose={close} title={`Your cart${count ? ` (${count})` : ""}`}
      footer={lines.length > 0 && (
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-muted">Subtotal</span>
            <motion.span key={total} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              aria-live="polite" className="font-display text-2xl font-semibold">{money(total)}</motion.span>
          </div>
          <p className="mt-1 text-xs text-muted">Digital delivery, no shipping. Demo store: no payment is taken.</p>
          <button onClick={checkout}
            className="mt-4 min-h-12 w-full rounded-full bg-accent font-semibold text-on-accent transition hover:brightness-110 active:scale-[0.98]">
            Checkout
          </button>
        </div>
      )}>
      {done ? (
        <div className="grid h-full place-items-center text-center">
          <div>
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent/15 text-accent"><Check aria-hidden size={32} /></span>
            <p className="mt-4 font-display text-2xl font-semibold">Thank you.</p>
            <p className="text-muted">This is a demo, so nothing was charged.</p>
            <button onClick={close} className="mt-6 min-h-11 rounded-full border border-line px-6 font-semibold hover:bg-line/50">Keep browsing</button>
          </div>
        </div>
      ) : lines.length === 0 ? (
        <div className="grid h-full place-items-center text-center text-muted">
          <div>
            <ShoppingBag aria-hidden size={40} className="mx-auto opacity-50" />
            <p className="mt-3 font-display text-xl text-fg">Your cart is empty</p>
            <p>Add a book from the shelf and it will appear here.</p>
            <a href="#catalog" onClick={close} className="mt-4 inline-block font-semibold text-accent underline underline-offset-4">Browse the catalog</a>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          <AnimatePresence initial={false}>
            {lines.map(({ book, qty }) => (
              <motion.li key={book.id} layout exit={{ opacity: 0, height: 0 }} className="flex gap-4 py-4 first:pt-0">
                <div className="w-16 shrink-0 text-[6px]"><BookCover book={book} /></div>
                <div className="min-w-0 flex-1">
                  <p className="font-display leading-snug font-semibold">{book.title}</p>
                  <p className="text-sm text-muted">{book.author}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-line">
                      <button onClick={() => setQty(book.id, qty - 1)} aria-label={`Decrease quantity of ${book.title}`}
                        className="grid size-11 place-items-center rounded-full hover:bg-line/50"><Minus aria-hidden size={16} /></button>
                      <span aria-live="polite" className="w-6 text-center font-semibold">{qty}</span>
                      <button onClick={() => setQty(book.id, qty + 1)} disabled={qty >= 9} aria-label={`Increase quantity of ${book.title}`}
                        className="grid size-11 place-items-center rounded-full hover:bg-line/50 disabled:opacity-40"><Plus aria-hidden size={16} /></button>
                    </div>
                    <span className="font-semibold">{money(book.price * qty)}</span>
                  </div>
                </div>
                <button onClick={() => remove(book.id)} aria-label={`Remove ${book.title} from cart`}
                  className="grid size-11 shrink-0 place-items-center self-start rounded-full text-muted hover:bg-line/50 hover:text-fg">
                  <Trash2 aria-hidden size={18} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </Drawer>
  );
}
