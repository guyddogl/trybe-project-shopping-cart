const saveCartItems = (saveCartList, saveTotalPrice) => {
  localStorage.setItem('cartItems', saveCartList);
  localStorage.setItem('totalPrice', saveTotalPrice);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
