'use strict';

function buildCartItems(inputs, allItems) {
  let cartItems = [];

  inputs.forEach(function (input) {
    let str = input.split('-');
    let barcode = str[0];
    let count = parseInt(str[1] || 1);
    let item = findItem(barcode, allItems);
    cartItems = findCartItem(item, cartItems, count);
  });

  return cartItems;
}

function findItem(barcode, allItems) {
  for (let i = 0; i < allItems.length; i++) {
    let item = allItems[i];
    if (item.barcode === barcode)

      return item;
  }
}

function findCartItem(item, cartItems, count) {
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    if (item === cartItem.item) {
      cartItem.count += count;

      return cartItems;
    }
  }
  cartItems.push({item: item, count: count});

  return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
  let receiptItems = [];

  cartItems.forEach(function (cartItem) {
    let saved = 0;
    let subtotal = cartItem.count * cartItem.item.price;

    let promotion = findPromotionType(promotions, cartItem.item.barcode);

    if (promotion === 'BUY_TWO_GET_ONE_FREE') {
      saved = parseInt(cartItem.count / 3) * cartItem.item.price;
      subtotal -= saved;
    }
    receiptItems.push({cartItem: cartItem, saved: saved, subtotal: subtotal});
  });

  return receiptItems;
}

function findPromotionType(promotions, barcode) {
  for (let i = 0; i < promotions.length; i++) {
    let promotion = promotions[i];
    if (isBarcodeExist(barcode, promotion.barcodes))

      return promotion.type;
  }
}

function isBarcodeExist(barcode, barcodes) {
  for (let i = 0; i < barcodes.length; i++) {
    if (barcode === barcodes[i])

      return true;
  }
  return false;
}
