const fetchProducts = async (product) => {
  if (!product) throw new Error('You must provide an url');
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const result = await fetch(URL);
    const data = await result.json();
    // console.log(data.results);
    return data;
  } catch (error) {
    return console.log(`Deu erro: ${error}`);
  }
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
