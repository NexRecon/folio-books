export type Category = "Novels" | "Academic" | "Tech";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  price: number;
  rating: number;
  reviews: number;
  pages: number;
  year: number;
  summary: string;
  authorBio: string;
  /** two CSS colours used to paint the generated cover */
  cover: [string, string];
  featured?: boolean;
}

export const CATEGORIES: ("All" | Category)[] = ["All", "Novels", "Academic", "Tech"];

export const BOOKS: Book[] = [
  { id: "salt-and-lantern", title: "The Salt & the Lantern", author: "Mara Ellison", category: "Novels", price: 14.5, rating: 4.8, reviews: 2140, pages: 412, year: 2025, featured: true,
    summary: "A lighthouse keeper's daughter inherits a ledger of every ship that never came home, and sets out along a salt-crusted coast to learn who kept the lamps burning for them.",
    authorBio: "Mara Ellison grew up on the Cornish coast and writes slow, tidal novels about memory and inheritance. This is her fourth book.", cover: ["#0f3d4c", "#e8a54b"] },
  { id: "quiet-orchard", title: "A Quiet Orchard", author: "Tomás Reyes", category: "Novels", price: 11.0, rating: 4.5, reviews: 860, pages: 288, year: 2024,
    summary: "Three generations of one family argue, harvest and forgive across a single apple season in the Basque hills.",
    authorBio: "Tomás Reyes is a Spanish novelist and former agronomist. His work has been translated into eleven languages.", cover: ["#5b2a3c", "#f2c9a0"] },
  { id: "paper-moons", title: "Paper Moons", author: "Ines Okafor", category: "Novels", price: 12.75, rating: 4.6, reviews: 1320, pages: 336, year: 2025,
    summary: "A stage-set painter in 1950s Lagos and the playwright who keeps rewriting the ending of her life.",
    authorBio: "Ines Okafor is a Nigerian-British writer whose debut won the Commonwealth First Book Prize.", cover: ["#2d2a5c", "#f0b8c8"] },
  { id: "long-winter-ink", title: "Ink for a Long Winter", author: "Dag Halvorsen", category: "Novels", price: 10.25, rating: 4.3, reviews: 540, pages: 254, year: 2023,
    summary: "A translator snowed into a Norwegian cabin discovers the manuscript she is translating is about her.",
    authorBio: "Dag Halvorsen is a Norwegian poet turned novelist, based in Tromsø.", cover: ["#1d2b3a", "#cfd8e3"] },
  { id: "fields-of-meaning", title: "Fields of Meaning", author: "Leila Haddad", category: "Academic", price: 38.0, rating: 4.7, reviews: 410, pages: 520, year: 2024,
    summary: "A rigorous but readable survey of how semantic fields shape the way languages carve up experience, with case studies from twelve language families.",
    authorBio: "Leila Haddad teaches linguistics at the University of Edinburgh and has published widely on lexical semantics.", cover: ["#3b4a2a", "#e9e2b0"] },
  { id: "economies-of-trust", title: "Economies of Trust", author: "J. R. Whitfield", category: "Academic", price: 42.0, rating: 4.4, reviews: 275, pages: 468, year: 2023,
    summary: "How reputation, contracts and community enforcement make markets possible, tested against three centuries of trade records.",
    authorBio: "J. R. Whitfield is a professor of economic history at the University of Toronto.", cover: ["#4a3b1f", "#f3d58a"] },
  { id: "deep-time", title: "Deep Time and Human Memory", author: "Sana Iqbal", category: "Academic", price: 34.5, rating: 4.6, reviews: 320, pages: 392, year: 2025,
    summary: "Geology meets anthropology: how people have imagined, recorded and misjudged timescales far beyond a human life.",
    authorBio: "Sana Iqbal is a geoscientist and historian of science at ETH Zürich.", cover: ["#6b3a1e", "#f4b183"] },
  { id: "cities-as-text", title: "Cities as Text", author: "Marco Bellini", category: "Academic", price: 29.0, rating: 4.2, reviews: 190, pages: 310, year: 2022,
    summary: "A reading of urban space as a document written by many hands, from Roman grids to ride-share maps.",
    authorBio: "Marco Bellini is an urbanist and lecturer at the Politecnico di Milano.", cover: ["#2a2f45", "#b9c4ff"] },
  { id: "systems-that-last", title: "Systems That Last", author: "Priya Nandakumar", category: "Tech", price: 39.0, rating: 4.9, reviews: 3180, pages: 448, year: 2025,
    summary: "Practical principles for building software that survives its authors: boundaries, failure budgets, migrations and the boring art of deletion.",
    authorBio: "Priya Nandakumar is a staff engineer who has run infrastructure at three companies you have heard of.", cover: ["#0b1f2e", "#4de1c1"] },
  { id: "rust-in-anger", title: "Rust in Anger", author: "Callum Reid", category: "Tech", price: 35.0, rating: 4.7, reviews: 1760, pages: 380, year: 2024,
    summary: "A field guide to shipping Rust services: the errors you will meet, the crates worth trusting, and how to debug in production.",
    authorBio: "Callum Reid maintains several open-source async libraries and speaks regularly at systems conferences.", cover: ["#3a1a12", "#ff9a62"] },
  { id: "statistics-skeptical", title: "Statistics for the Skeptical", author: "Hana Mori", category: "Tech", price: 31.5, rating: 4.5, reviews: 940, pages: 340, year: 2023,
    summary: "A hands-on introduction to inference, uncertainty and the many ways a chart can lie, with Python notebooks throughout.",
    authorBio: "Hana Mori is a data scientist and former biostatistician turned educator.", cover: ["#1f2a44", "#ffd166"] },
  { id: "design-of-queues", title: "The Design of Queues", author: "Elias Brandt", category: "Tech", price: 33.0, rating: 4.4, reviews: 610, pages: 296, year: 2024,
    summary: "Message queues, backpressure and why every distributed system is secretly a waiting room.",
    authorBio: "Elias Brandt is a distributed-systems consultant based in Berlin.", cover: ["#2b1b3d", "#c792ea"] },
];
