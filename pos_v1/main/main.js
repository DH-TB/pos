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

