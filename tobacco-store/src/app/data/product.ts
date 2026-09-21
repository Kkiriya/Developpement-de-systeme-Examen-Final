export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: string;
  description: string;
  details: string[];
  image: string;
};

export const products: Product[] = [
  {
    id: "tabac-feuille-classique",
    name: "Tabac en feuille classique",
    category: "Tabac en feuille",
    price: 26.99,
    qty: "lb",
    description:
      "Produit présenté à titre informatif dans le cadre de cette maquette.",
    details: [
      "Format : feuilles",
      "Origine : Amérique du Nord",
      "Catégorie : tabac en feuille",
    ],
    image: "/products/tobacco-leaf.jpg",
    
  },
  {
    id: "feuilles-rouler",
    name: "Feuilles à rouler",
    category: "Accessoires",
    price: 2,
    qty: "32 sheets",
    description:
      "Exemple de produit présenté dans le catalogue de démonstration.",
    details: ["Format : feuilles", "Catégorie : accessoires"],
    image: "/products/rolling-papers.jpg",
  },
  {
    id: "cigarette-prerouler",
    name: "cigarette",
    category: "Tabac",
    price: 5.99,
    qty: "20 cigarettes",
    description:
      "Exemple de produit présenté dans le catalogue de démonstration.",
    details: ["Format : cigarette", "Catégorie : Tabac"],
    image: "/products/cigarettes.jpg",
  },
];
