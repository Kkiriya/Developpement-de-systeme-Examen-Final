export type Language = "fr" | "en" | "es";

export const translations = {
  fr: {
    header: {
      home: "Accueil",
      catalogue: "Catalogue",
      recompense: "Récompenses",
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

    rewards: {
      balance: "Votre solde",
      points: "points",
      credit: "Crédit",
      freeShipping: "Livraison gratuite",
      available: "Disponible",
      unavailable: "Non disponible",

      howToEarn: "Comment gagner des points ?",
      earnDescription:
        "Chaque dollar complet dépensé vous rapporte 100 points.",

      title: "Récompenses",
      redeem: "Échanger",
      alreadyRedeemed: "Déjà obtenu",
      alreadyAvailable: "Déjà disponible",
      insufficientPoints: "Points insuffisants",

      successCoupon: "Récompense obtenue ! Votre code est :",

      successShipping: "La livraison gratuite a été ajoutée à votre compte.",

      successCredit: "de crédit ont été ajoutés à votre compte.",

      insufficientPointsMessage:
        "Vous n'avez pas assez de points pour cette récompense.",

      coupon5: "Coupon 5 %",
      coupon5Description: "Obtenez 5 % de rabais sur votre prochaine commande.",

      coupon10: "Coupon 10 %",
      coupon10Description:
        "Obtenez 10 % de rabais sur votre prochaine commande.",

      coupon15: "Coupon 15 %",
      coupon15Description:
        "Obtenez 15 % de rabais sur votre prochaine commande.",

      shippingReward: "Livraison gratuite",
      shippingDescription: "Obtenez la livraison gratuite sur une commande.",

      credit5: "Crédit de 5 $",
      credit5Description: "Ajoutez 5 $ de crédit à votre compte.",

      credit10: "Crédit de 10 $",
      credit10Description: "Ajoutez 10 $ de crédit à votre compte.",

      credit20: "Crédit de 20 $",
      credit20Description: "Ajoutez 20 $ de crédit à votre compte.",
    },

    cart: {
      emptyTitle: "Votre panier est vide",

      emptyDescription:
        "Ajoutez des produits à votre panier pour les retrouver ici.",

      viewCatalogue: "Voir le catalogue",

      backToCatalogue: "← Retour au catalogue",

      title: "Votre panier",

      description: "Vérifiez les articles ajoutés à votre panier.",

      summary: "Résumé",

      promotionalCode: "Code promotionnel",

      apply: "Appliquer",

      placeholder: "Ex. DEMO10",

      invalidCode: "Code invalide.",

      alreadyApplied: "Ce coupon est déjà appliqué.",

      codeApplied: "Code {code} appliqué.",

      storeCredit: "Crédit disponible",

      availableCredit: "Crédit disponible",

      useCredit: "Utiliser le crédit",

      creditApplied: "Crédit appliqué",

      removeCredit: "Retirer le crédit",

      subtotal: "Sous-total",

      discount: "Réduction",

      afterDiscount: "Sous-total après réduction",

      taxes: "Taxes",

      total: "Total",

      earnedPoints: "Points gagnés",

      pointsDescription:
        "Les points sont calculés avant les taxes et après les réductions.",

      checkout: "Finaliser la commande",

      checkoutNote: "Vous gagnerez {points} points avec cette commande.",

      prototypeMessage:
        "Fonctionnalité non disponible dans cette version du prototype.",

      remove: "Retirer",

      decreaseQuantity: "Diminuer la quantité de {name}",

      increaseQuantity: "Augmenter la quantité de {name}",

      orderConfirmed: "Commande confirmée ! Vous avez gagné {points} points.",

      orderConfirmedTitle: "Commande confirmée !",

      per: "par",
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
      recompense: "Rewards",
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

    rewards: {
      balance: "Your balance",
      points: "points",
      credit: "Credit",
      freeShipping: "Free shipping",
      available: "Available",
      unavailable: "Not available",

      howToEarn: "How do you earn points?",

      earnDescription: "Every full dollar spent earns you 100 points.",

      title: "Rewards",

      redeem: "Redeem",

      alreadyRedeemed: "Already redeemed",

      alreadyAvailable: "Already available",

      insufficientPoints: "Not enough points",

      successCoupon: "Reward obtained! Your code is:",

      successShipping: "Free shipping has been added to your account.",

      successCredit: "in credit has been added to your account.",

      insufficientPointsMessage:
        "You do not have enough points for this reward.",

      coupon5: "5% Coupon",
      coupon5Description: "Get 5% off your next order.",

      coupon10: "10% Coupon",
      coupon10Description: "Get 10% off your next order.",

      coupon15: "15% Coupon",
      coupon15Description: "Get 15% off your next order.",

      shippingReward: "Free shipping",

      shippingDescription: "Get free shipping on one order.",

      credit5: "$5 Credit",
      credit5Description: "Add $5 of credit to your account.",

      credit10: "$10 Credit",
      credit10Description: "Add $10 of credit to your account.",

      credit20: "$20 Credit",
      credit20Description: "Add $20 of credit to your account.",
    },

    cart: {
      emptyTitle: "Your cart is empty",

      emptyDescription: "Add products to your cart to find them here.",

      viewCatalogue: "View catalogue",

      backToCatalogue: "← Back to catalogue",

      title: "Your cart",

      description: "Review the items added to your cart.",

      summary: "Summary",

      promotionalCode: "Promotional code",

      apply: "Apply",

      placeholder: "E.g. DEMO10",

      invalidCode: "Invalid code.",

      alreadyApplied: "This coupon is already applied.",

      codeApplied: "Code {code} applied.",

      storeCredit: "Store credit",

      availableCredit: "Available credit",

      useCredit: "Use credit",

      creditApplied: "Credit applied",

      removeCredit: "Remove credit",

      subtotal: "Subtotal",

      discount: "Discount",

      afterDiscount: "Subtotal after discount",

      taxes: "Taxes",

      total: "Total",

      earnedPoints: "Points earned",

      pointsDescription:
        "Points are calculated before taxes and after discounts.",

      checkout: "Complete order",

      checkoutNote: "You will earn {points} points with this order.",

      prototypeMessage:
        "This feature is not available in this version of the prototype.",

      remove: "Remove",

      decreaseQuantity: "Decrease quantity of {name}",

      increaseQuantity: "Increase quantity of {name}",

      orderConfirmed: "Order confirmed! You earned {points} points.",

      orderConfirmedTitle: "Order confirmed!",

      per: "per",
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
      recompense: "Recompensas",
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

    rewards: {
      balance: "Tu saldo",

      points: "puntos",

      credit: "Crédito",

      freeShipping: "Envío gratis",

      available: "Disponible",

      unavailable: "No disponible",

      howToEarn: "¿Cómo ganar puntos?",

      earnDescription: "Cada dólar completo gastado te otorga 100 puntos.",

      title: "Recompensas",

      redeem: "Canjear",

      alreadyRedeemed: "Ya obtenido",

      alreadyAvailable: "Ya disponible",

      insufficientPoints: "Puntos insuficientes",

      successCoupon: "¡Recompensa obtenida! Tu código es:",

      successShipping: "El envío gratis se ha añadido a tu cuenta.",

      successCredit: "de crédito se han añadido a tu cuenta.",

      insufficientPointsMessage:
        "No tienes suficientes puntos para esta recompensa.",

      coupon5: "Cupón 5 %",

      coupon5Description: "Obtén un 5 % de descuento en tu próximo pedido.",

      coupon10: "Cupón 10 %",

      coupon10Description: "Obtén un 10 % de descuento en tu próximo pedido.",

      coupon15: "Cupón 15 %",

      coupon15Description: "Obtén un 15 % de descuento en tu próximo pedido.",

      shippingReward: "Envío gratis",

      shippingDescription: "Obtén envío gratis en un pedido.",

      credit5: "Crédito de 5 $",

      credit5Description: "Añade 5 $ de crédito a tu cuenta.",

      credit10: "Crédito de 10 $",

      credit10Description: "Añade 10 $ de crédito a tu cuenta.",

      credit20: "Crédito de 20 $",

      credit20Description: "Añade 20 $ de crédito a tu cuenta.",
    },

    cart: {
      emptyTitle: "Tu carrito está vacío",

      emptyDescription: "Añade productos a tu carrito para encontrarlos aquí.",

      viewCatalogue: "Ver catálogo",

      backToCatalogue: "← Volver al catálogo",

      title: "Tu carrito",

      description: "Revisa los artículos añadidos a tu carrito.",

      summary: "Resumen",

      promotionalCode: "Código promocional",

      apply: "Aplicar",

      placeholder: "Ej. DEMO10",

      invalidCode: "Código inválido.",

      alreadyApplied: "Este cupón ya está aplicado.",

      codeApplied: "Código {code} aplicado.",

      storeCredit: "Crédito disponible",

      availableCredit: "Crédito disponible",

      useCredit: "Usar crédito",

      creditApplied: "Crédito aplicado",

      removeCredit: "Eliminar crédito",

      subtotal: "Subtotal",

      discount: "Descuento",

      afterDiscount: "Subtotal después del descuento",

      taxes: "Impuestos",

      total: "Total",

      earnedPoints: "Puntos obtenidos",

      pointsDescription:
        "Los puntos se calculan antes de los impuestos y después de los descuentos.",

      checkout: "Finalizar pedido",

      checkoutNote: "Ganarás {points} puntos con este pedido.",

      prototypeMessage:
        "Esta función no está disponible en esta versión del prototipo.",

      remove: "Eliminar",

      decreaseQuantity: "Disminuir la cantidad de {name}",

      increaseQuantity: "Aumentar la cantidad de {name}",

      orderConfirmed: "¡Pedido confirmado! Has obtenido {points} puntos.",

      orderConfirmedTitle: "¡Pedido confirmado!",

      per: "por",
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
