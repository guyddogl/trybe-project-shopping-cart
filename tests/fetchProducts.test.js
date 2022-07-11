require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se fetch foi chamada ao executar a função fetchProducts com o parâmetro computador', async () => {
    expect.assertions(1);
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica se fetchProducts utilizou a url https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts("computador");
    expect(fetch).toBeCalledWith(url);
  });
  test('Verifica se o retorno de fetchProducts é igual a const computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts("computador");
    expect(result).toEqual(computadorSearch);
  });
  test('Verifica se fetchProducts retorna erro ao ser executada sem parâmetro', async () => {
    expect.assertions(1);
    try {
      await await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
