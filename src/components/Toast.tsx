import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.p key={toast.n} initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="glass flex max-w-full items-center gap-3 rounded-full py-2.5 pr-5 pl-3 text-sm font-medium shadow-2xl shadow-accent/25">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent"><Check aria-hidden size={16} /></span>
            <span className="truncate">Added <em className="font-display">{toast.title}</em> to your cart</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
