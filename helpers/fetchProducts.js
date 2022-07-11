const fetchProducts = async (product) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const result = await fetch(URL);
    const data = await result.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
