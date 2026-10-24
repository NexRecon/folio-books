import { Moon, ShoppingBag, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../context/CartContext";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { theme, toggle } = useTheme();
  const { count } = useCart();

  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-accent text-sm text-on-accent">F</span>
          Folio
        </a>
        <ul className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <li><a className="transition hover:text-fg" href="#catalog">Catalog</a></li>
          <li><a className="transition hover:text-fg" href="#why">Why Folio</a></li>
          <li><a className="transition hover:text-fg" href="#newsletter">Newsletter</a></li>
        </ul>
        <div className="flex items-center gap-1">
          <button onClick={toggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-11 place-items-center rounded-full transition hover:bg-line/60">
            {theme === "dark" ? <Sun aria-hidden size={20} /> : <Moon aria-hidden size={20} />}
          </button>
          <button onClick={onOpenCart} aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative grid size-11 place-items-center rounded-full transition hover:bg-line/60">
            <ShoppingBag aria-hidden size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute top-1 right-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-on-accent">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </header>
  );
}
