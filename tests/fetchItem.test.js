require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Verifica se fetch foi chamada ao executar a fetchItem com o parâmetro MLB1615760527', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica se fetchItem utilizou a url https://api.mercadolibre.com/items/MLB1615760527', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });
  test('Verifica se o retorno de fetchProducts é igual a const item', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  test('Verifica se fetchProducts retorna erro ao ser executada sem parâmetro', async () => {
    expect.assertions(1);
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };
  });
  test('Verifica se fetchProducts retorna erro ao ser executada sem parâmetro', async () => {
    try {
      await fetchItem('guyddo');
    } catch (error) {
      expect(error).toEqual(new Error('resource not found'));
    };
  });
});
