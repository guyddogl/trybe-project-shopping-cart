const fetchItem = async (item) => {
  try {
    const URL = `https://api.mercadolibre.com/items/${item}`;
    const result = await fetch(URL);
    const data = await result.json();
    return data;
  } catch (error) {
    return `You must provide an url`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
