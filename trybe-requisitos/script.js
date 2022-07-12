const sectionProducts = document.getElementById('products');
const listCart = document.getElementById('list-cart');
const buttonsAddToCart = document.getElementsByClassName('item__add');
const loadingSpan = document.getElementsByClassName('loading');
const buttonEmptyCart = document.getElementById('emptyCart');
const cartItems = document.getElementsByClassName('cart__item');
const totalPrice = document.getElementById('total-price');

const sumPrice = (price) => {
  totalPrice.innerText = Math.round((Number(totalPrice.innerText) + Number(price)) * 100) / 100;
};

const emptyCart = () => {
  listCart.innerHTML = '';
  totalPrice.innerText = 0;
  saveCartItems(listCart.innerHTML);
};

buttonEmptyCart.addEventListener('click', emptyCart);

const saveTotalPrice = () => {
  const price = totalPrice.innerText;
  localStorage.setItem('totalPrice', price);
};

const getSavedTotalPrice = () => localStorage.getItem('totalPrice');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const item = event.target;
  const { innerText } = event.path[0];
  const price = innerText.substring(innerText.indexOf('$') + 1);
  totalPrice.innerText = Math.round((Number(totalPrice.innerText) - Number(price)) * 100) / 100;
  item.remove();
  saveTotalPrice();
  saveCartItems(listCart.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const loadingApi = () => {
  const loading = document.createElement('span');
  loading.innerText = 'carregando...';
  loading.classList.add('loading');
  return loading;
};

listCart.innerHTML = getSavedCartItems();
totalPrice.innerText = getSavedTotalPrice();

window.onload = async () => { 
  sectionProducts.appendChild(loadingApi());
  const { results } = await fetchProducts('computador');
  results.forEach((item) => {
    const objProduct = { sku: item.id, name: item.title, image: item.thumbnail };
    sectionProducts.appendChild(createProductItemElement(objProduct));
  });
  loadingSpan[0].remove();
  Array.from(buttonsAddToCart).forEach((button) => {
    button.addEventListener('click', async (e) => {
      const result = await fetchItem(e.path[1].childNodes[0].outerText);
      const objitem = { sku: result.id, name: result.title, salePrice: result.price };
      listCart.appendChild(createCartItemElement(objitem));
      sumPrice(result.price);
      saveTotalPrice();
      saveCartItems(listCart.innerHTML);
    });
  });
  Array.from(cartItems).forEach((item) => item.addEventListener('click', cartItemClickListener));
};
