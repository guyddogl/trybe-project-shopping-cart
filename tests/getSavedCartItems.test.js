const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se ao executar getSavedCartItems o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toBeCalledTimes(1);
  });
  test('Verifica se ao executar getSavedCartItems o método localStorage.getItem é chamado com cartItems como parâmetro', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
