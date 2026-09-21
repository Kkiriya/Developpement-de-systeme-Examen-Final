export type Language = "fr" | "en" | "es";

export const translations = {
  fr: {
    header: {
      home: "Accueil",
      catalogue: "Catalogue",
      language: "Langue",
      textSize: "Taille du texte",
      enableLargeText: "Activer le texte plus grand",
      enableDarkMode: "Activer le thème sombre",
    },

    home: {
      brand: "AirSmokes",
      heroTitle: "Découvrez notre catalogue",
      heroDescription:
        "Explorez notre catalogue de produits et consultez les informations disponibles pour chaque produit.",
      viewCatalogue: "Voir le catalogue",

      categories: "Catégories",
      browseCategories: "Parcourir par catégorie",

      tobacco: "Tabac",
      tobaccoDescription: "Consultez les produits de la catégorie tabac.",

      leafTobacco: "Tabac en feuille",
      leafTobaccoDescription: "Découvrez les produits de tabac en feuille.",

      accessories: "Accessoires",
      accessoriesDescription:
        "Consultez les accessoires disponibles dans le catalogue.",

      products: "Produits",
      featuredProducts: "Produits présentés",
      viewAll: "Voir tout →",
    },

    catalogue: {
      title: "Catalogue",
      search: "Rechercher",
      searchPlaceholder: "Nom du produit...",
      category: "Catégorie",
      allCategories: "Toutes les catégories",
      product: "produit",
      products: "produits",
      noProducts: "Aucun produit trouvé",
      noResultsFor: "Aucun résultat pour",
      tryAgain: "Essayez une autre recherche ou une autre catégorie.",
    },

    product: {
      back: "Retour au catalogue",
      information: "Informations",
      quantity: "Quantité",
    },

    footer: {
      description:
        "Projet scolaire réalisé à des fins de démonstration et d'apprentissage.",
      navigation: "Navigation",
      information: "Information",
      academic:
        "Cette interface est une maquette académique. Les produits présentés sont fictifs et aucune transaction n'est effectuée.",
      copyright: "© 2026 AirSmokes — Projet scolaire",
    },
  },

  en: {
    header: {
      home: "Home",
      catalogue: "Catalogue",
      language: "Language",
      textSize: "Text size",
      enableLargeText: "Enable larger text",
      enableDarkMode: "Enable dark mode",
    },

    home: {
      brand: "AirSmokes",
      heroTitle: "Discover our catalogue",
      heroDescription:
        "Explore our product catalogue and view the information available for each product.",
      viewCatalogue: "View catalogue",

      categories: "Categories",
      browseCategories: "Browse by category",

      tobacco: "Tobacco",
      tobaccoDescription: "Browse products in the tobacco category.",

      leafTobacco: "Leaf tobacco",
      leafTobaccoDescription: "Discover our leaf tobacco products.",

      accessories: "Accessories",
      accessoriesDescription:
        "Browse the accessories available in the catalogue.",

      products: "Products",
      featuredProducts: "Featured products",
      viewAll: "View all →",
    },

    catalogue: {
      title: "Catalogue",
      search: "Search",
      searchPlaceholder: "Product name...",
      category: "Category",
      allCategories: "All categories",
      product: "product",
      products: "products",
      noProducts: "No products found",
      noResultsFor: "No results for",
      tryAgain: "Try another search or category.",
    },

    product: {
      back: "Back to catalogue",
      information: "Information",
      quantity: "Quantity",
    },

    footer: {
      description:
        "School project created for demonstration and learning purposes.",
      navigation: "Navigation",
      information: "Information",
      academic:
        "This interface is an academic mockup. The products shown are fictional and no transactions are performed.",
      copyright: "© 2026 AirSmokes — School project",
    },
  },

  es: {
    header: {
      home: "Inicio",
      catalogue: "Catálogo",
      language: "Idioma",
      textSize: "Tamaño del texto",
      enableLargeText: "Activar texto más grande",
      enableDarkMode: "Activar el modo oscuro",
    },

    home: {
      brand: "AirSmokes",
      heroTitle: "Descubre nuestro catálogo",
      heroDescription:
        "Explora nuestro catálogo de productos y consulta la información disponible para cada producto.",
      viewCatalogue: "Ver catálogo",

      categories: "Categorías",
      browseCategories: "Explorar por categoría",

      tobacco: "Tabaco",
      tobaccoDescription: "Consulta los productos de la categoría de tabaco.",

      leafTobacco: "Tabaco en hoja",
      leafTobaccoDescription: "Descubre nuestros productos de tabaco en hoja.",

      accessories: "Accesorios",
      accessoriesDescription:
        "Consulta los accesorios disponibles en el catálogo.",

      products: "Productos",
      featuredProducts: "Productos destacados",
      viewAll: "Ver todos →",
    },

    catalogue: {
      title: "Catálogo",
      search: "Buscar",
      searchPlaceholder: "Nombre del producto...",
      category: "Categoría",
      allCategories: "Todas las categorías",
      product: "producto",
      products: "productos",
      noProducts: "No se encontraron productos",
      noResultsFor: "No hay resultados para",
      tryAgain: "Intenta otra búsqueda o categoría.",
    },

    product: {
      back: "Volver al catálogo",
      information: "Información",
      quantity: "Cantidad",
    },

    footer: {
      description:
        "Proyecto escolar realizado con fines de demostración y aprendizaje.",
      navigation: "Navegación",
      information: "Información",
      academic:
        "Esta interfaz es una maqueta académica. Los productos mostrados son ficticios y no se realizan transacciones.",
      copyright: "© 2026 AirSmokes — Proyecto escolar",
    },
  },
} as const;
