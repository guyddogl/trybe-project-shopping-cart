const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Verifica se localStorage.setItem é chamado ao executar a função saveCartItems', async () => {
    await saveCartItems();
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
