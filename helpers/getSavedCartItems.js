const getSavedCartItems = () => {
  const cartList = document.getElementById('list-cart');
  // const totalPrice = document.getElementById('total-price');
  cartList.innerHTML = localStorage.getItem('cartItems');
  // totalPrice.innerText = localStorage.getItem('totalPrice');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
