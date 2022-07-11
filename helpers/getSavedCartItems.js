const getSavedCartItems = () => {
  const cartList = document.getElementById('list-cart');
  cartList.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
