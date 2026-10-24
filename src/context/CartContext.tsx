import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import { BOOKS, type Book } from "../data/books";

type Lines = Record<string, number>;
type Action =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "set"; id: string; qty: number }
  | { type: "clear" };

const STORAGE_KEY = "folio-cart";

function reducer(state: Lines, action: Action): Lines {
  switch (action.type) {
    case "add":
      return { ...state, [action.id]: Math.min((state[action.id] ?? 0) + 1, 9) };
    case "set": {
      if (action.qty <= 0) return reducer(state, { type: "remove", id: action.id });
      return { ...state, [action.id]: Math.min(action.qty, 9) };
    }
    case "remove": {
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case "clear":
      return {};
  }
}

function load(): Lines {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Lines;
    return Object.fromEntries(Object.entries(raw).filter(([id, q]) => BOOKS.some((b) => b.id === id) && q > 0));
  } catch {
    return {};
  }
}

interface CartValue {
  lines: { book: Book; qty: number }[];
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** most recent add-to-cart, shown briefly as a toast */
  toast: { n: number; title: string } | null;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load);
  const [toast, setToast] = useState<{ n: number; title: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const flash = useCallback((id: string) => {
    const title = BOOKS.find((b) => b.id === id)?.title;
    if (!title) return;
    setToast((t) => ({ n: (t?.n ?? 0) + 1, title }));
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable: cart still works for this session */
    }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const items = BOOKS.filter((b) => lines[b.id]).map((book) => ({ book, qty: lines[book.id] }));
    return {
      lines: items,
      count: items.reduce((n, l) => n + l.qty, 0),
      // work in cents to avoid float drift
      total: items.reduce((sum, l) => sum + Math.round(l.book.price * 100) * l.qty, 0) / 100,
      qtyOf: (id) => lines[id] ?? 0,
      add: (id) => { dispatch({ type: "add", id }); flash(id); },
      setQty: (id, qty) => dispatch({ type: "set", id, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      toast,
    };
  }, [lines, toast, flash]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
