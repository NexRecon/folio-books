import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import BookDrawer from "./components/BookDrawer";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import { Footer, Marquee, Newsletter, Readers, Why } from "./components/Sections";
import type { Book } from "./data/books";

export default function App() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const closeBook = useCallback(() => setSelected(null), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <>
      <a href="#catalog" className="skip-link fixed top-2 left-2 z-[60] rounded-lg bg-accent px-4 py-2 text-on-accent">Skip to catalog</a>
      <Header onOpenCart={openCart} />
      <main>
        <Hero onOpen={setSelected} />
        <Marquee />
        <Catalog onOpen={setSelected} />
        <Why />
        <Readers />
        <Newsletter />
      </main>
      <Footer />
      <BookDrawer book={selected} onClose={closeBook} onOpenCart={openCart} />
      <CartDrawer open={cartOpen} onClose={closeCart} />
      <Toast />
    </>
  );
}
