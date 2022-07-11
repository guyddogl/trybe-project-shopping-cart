const fetchItem = async (item) => {
  if (!item) throw new Error('You must provide an url');
  try {
    const URL = `https://api.mercadolibre.com/items/${item}`;
    const result = await fetch(URL);
    const data = await result.json();
    return data;
  } catch (error) {
    return `Erro: ${error}`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
