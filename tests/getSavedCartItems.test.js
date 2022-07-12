const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se localStorage.getItem é chamado ao executar a função getSavedCartItems', async () => {
    await getSavedCartItems();
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });
});
