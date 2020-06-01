const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

function getProducts(ids, productsList) {
  let selectedProducts = [];
  ids.map((productId) =>
    productsList.find((product) => {
      if (product.id === productId) {
        selectedProducts.push(product);
      }
    })
  );
  return selectedProducts;
}

function createViewProducts(productsList) {
  return productsList.map((product) => ({
    name: product.name,
    category: product.category,
  }));
}

function getPromotion(productsList) {
  const categories = productsList.map((product) => product.category);
  let promotion = "";
  switch ([...new Set(categories)].length) {
    case 1:
      promotion = promotions[0];
      break;
    case 2:
      promotion = promotions[1];
      break;
    case 3:
      promotion = promotions[2];
      break;
    case 4:
      promotion = promotions[3];
      break;
  }
  return promotion;
}

function getTotalPrice(productsList, promotion) {
  const prices = productsList.map(
    (product) =>
      product.promotions.find((promo) => promo.looks.includes(promotion)) ||
      product
  );
  const total = prices.reduce(
    (totalPrice, product) =>
      (totalPrice += product.price || product.regularPrice),
    0
  );
  return total.toFixed(2);
}

function getRegularPrice(productsList) {
  let total = 0;
  productsList.map((product) => (total += product.regularPrice));
  return total.toFixed(2);
}

function getDiscount(productsList, totalPrice) {
  return (getRegularPrice(productsList) - totalPrice).toFixed(2);
}

function getShoppingCart(ids, productsList) {
  const selectedProducts = getProducts(ids, productsList);
  const products = createViewProducts(selectedProducts);
  const promotion = getPromotion(selectedProducts);
  const totalPrice = getTotalPrice(selectedProducts, promotion);
  const regularPrice = getRegularPrice(selectedProducts);
  const discountValue = getDiscount(selectedProducts, totalPrice);
  const discount = ((discountValue / regularPrice) * 100).toFixed(2) + "%";
  return {
    products,
    promotion,
    totalPrice,
    discountValue,
    discount,
  };
}

module.exports = { getShoppingCart };
