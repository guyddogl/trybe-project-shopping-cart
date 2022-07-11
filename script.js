const sectionProducts = document.getElementById('products');
const listCart = document.getElementById('list-cart');
const buttonsAddToCart = document.getElementsByClassName('item__add');

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
  item.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

window.onload = async () => { 
  const { results } = await fetchProducts('computador');
  results.forEach((item) => {
    const objProduct = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    sectionProducts.appendChild(createProductItemElement(objProduct));
  });
  Array.from(buttonsAddToCart).forEach((button) => {
    button.addEventListener('click', async (e) => {
      const item = e.path[1].childNodes[0].outerText;
      const result = await fetchItem(item);
      const objitem = { sku: result.id, name: result.title, salePrice: result.price };
      listCart.appendChild(createCartItemElement(objitem));
    });
  });
};
