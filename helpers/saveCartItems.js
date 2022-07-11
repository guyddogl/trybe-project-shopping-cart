const saveCartItems = () => {
  const saveCartList = document.getElementById('list-cart').innerHTML;
  localStorage.setItem('cartItems', saveCartList);
  const saveTotalPrice = totalPrice.innerText;
  localStorage.setItem('totalPrice', saveTotalPrice);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
