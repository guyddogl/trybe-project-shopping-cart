const saveCartItems = (saveCartList) => {
  localStorage.setItem('cartItems', saveCartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
