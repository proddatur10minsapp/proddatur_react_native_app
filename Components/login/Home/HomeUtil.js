export const formatSortLabel = (key) => {
    switch (key) {
      case 'relevance': return 'Relevance';
      case 'priceLowToHigh': return 'Price: Low to High';
      case 'priceHighToLow': return 'Price: High to Low';
      case 'popularity': return 'Popularity';
      default: return 'Sort';
    }
  };
