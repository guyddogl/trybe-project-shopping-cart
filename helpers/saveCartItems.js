const saveCartItems = () => {
  const saveCartList = document.getElementById('list-cart').innerHTML;
  // const saveTotalPrice = document.getElementById('total-price').innerText;
  return localStorage.setItem('cartItems', saveCartList);
  // localStorage.setItem('totalPrice', saveTotalPrice);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
