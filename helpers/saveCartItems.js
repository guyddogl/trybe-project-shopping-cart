const saveCartItems = () => {
  const saveCartList = document.getElementById('list-cart').innerHTML;
  localStorage.setItem('cartItems', saveCartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
