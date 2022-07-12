const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const buttonEmptyCart = document.getElementById('emptyCart');
const totalPrice = document.getElementById('total-price');
totalPrice.innerText = 0;
const loadingProducts = document.getElementById('loading-products');
const loadingCart = document.getElementById('loading-cart');
const buttonDeleteIcons = document.getElementsByClassName('delete-item');

toastr.options = {
  "closeButton": true,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
}

const createHmtlElement = (element) => document.createElement(element);

const sumPrice = (itemPrice) => totalPrice.innerText = Number(totalPrice.innerText) + Number(itemPrice);

const saveCart = () => {
  const saveCartList = cartList.innerHTML;
  localStorage.setItem('cartItems', saveCartList);
  const saveTotalPrice = totalPrice.innerText;
  localStorage.setItem('totalPrice', saveTotalPrice);
};

const emptyCart = () => {
  if (cartList.childNodes.length > 0) {
    totalPrice.innerText = 0;
    cartList.innerHTML = '';
    saveCart();
    return toastr.info(`Excluiu todos os itens do carrinho`);
  }
  totalPrice.innerText = 0;
  cartList.innerHTML = '';
  saveCart();
  toastr.warning(`Não há itens no carrinho`);
};

buttonEmptyCart.addEventListener('click', emptyCart);

const deleteItemFromCart = (event) => {
  const item = event.target.parentNode;
  const itemPrice = item.lastChild.innerText;
  totalPrice.innerText = Number(totalPrice.innerText) - Number(itemPrice);
  item.remove();
  saveCart();
  toastr.info(`Produto removido do carrinho`);
};

const createItemCart = (data) => {
  const itemList = createHmtlElement('li');
  itemList.classList.add('list-group-item');
  const id = Date.now();
  itemList.setAttribute('id', `list-${id}`);
  itemList.innerHTML = `<img src="${data.thumbnail}"> ${data.title.substr(0, 50) + '...'} <i id="delete-${id}" class="fa-solid fa-trash-can delete-item"></i><br/>R$<span class='item-price'>${data.price}</span>`;
  cartList.appendChild(itemList);
  const buttonDelete = document.getElementById(`delete-${id}`);
  buttonDelete.addEventListener('click', deleteItemFromCart);
  saveCart();
  toastr.success(`Produto adicionado ao carrinho`);
}

const recoverCart = () => {
  cartList.innerHTML = localStorage.getItem('cartItems');
  totalPrice.innerText = localStorage.getItem('totalPrice');
  Array.from(buttonDeleteIcons).forEach((item) => {
    item.addEventListener('click', deleteItemFromCart);
  });
}

const fetchItem = async (productUrl) => {
  if (!productUrl) throw new Error('You must provide an url');
  try {
    loadingCart.style.display = 'block';
    const URL = productUrl;
    const result = await fetch(URL);
    const data = await result.json();
    loadingCart.style.display = 'none';  
    createItemCart(data);
    sumPrice(data.price);
    saveCart();
  } catch (error) {
    return toastr.error(`Deu erro: ${error}`);
  }
};

const addItemToCart = (event) => {
  const item = event.target.id;
  fetchItem(`https://api.mercadolibre.com/items/${item}`);
};

const createButtonAddToCart = (id, divCardBody) => {
  const cardButton = createHmtlElement('a');
  cardButton.classList.add('btn', 'btn-primary');
  cardButton.setAttribute('id', id);
  cardButton.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho';
  cardButton.addEventListener('click', addItemToCart);
  divCardBody.appendChild(cardButton);
};

const createCardImg = (product, divCard) => {
  const img = createHmtlElement('img');
  img.classList.add('card-img-top', 'thumb');
  img.src = product.thumbnail;
  divCard.appendChild(img);
};

const createCard = (products) => {
  products.forEach((product) => {
    const divCard = createHmtlElement('div');
    const divCardBody = createHmtlElement('div');
    const cardText = createHmtlElement('p');
    divCard.classList.add('card');
    divCardBody.classList.add('card-body');
    cardText.classList.add('card-text');
    cardText.innerHTML = `${product.title.substr(0, 50)}...<br/><br/>R$ ${product.price}`;
    productList.appendChild(divCard);
    createCardImg(product, divCard);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(cardText); 
    createButtonAddToCart(product.id, divCardBody);
  });
};

const getApiData = async () => {
  try {
    loadingProducts.style.display = 'block';
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador&limit=8';
    const result = await fetch(URL);
    const data = await result.json();
    loadingProducts.style.display = 'none';
    createCard(data.results);
    // console.log(data.results);
    // toastr.success('API conectada!');
    return data;
  } catch (error) {
    return toastr.error(`Deu erro: ${error}`);
  }
};

window.onload = () => {
  getApiData();
  recoverCart();
}