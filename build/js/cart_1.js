// script for the Cart 

//initial conditions
let totalQuantity = 0;
let totalCost = 0;
let cartButton = document.getElementById("btnPurchase");

//add listener for all catalog buttons
let addToCartButtons = document.getElementsByClassName('btn-addToCart');
for (let i = 0; i < addToCartButtons.length; i++) {
     let button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

//collect information about the item  that the user wants to add to the cart
function addToCartClicked(event) {
  let button = event.target; //определяем какая именно кнопка была нажата
  let index = parseInt(button.id.match(/\d+/))-1; //получаем id нажатой кнопки, извлекаем число из названия класса и получаем индекс, соответсвуюший ключу товара в массиве items
  let itemName = items[index].name;
  let itemPrice = items[index].price;
  let item = button.parentElement;
  let imageSrc = item.getElementsByClassName('item__img')[0].src;
  addItemToCart(itemName, itemPrice, imageSrc)
}

// add items to the cart
function addItemToCart(itemName, itemPrice, imageSrc) {
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart__item');
  cartRow.classList.add('grid-row');
  let cartItems = document.getElementById('cartItems');
  let cartItemNames = cartItems.getElementsByClassName('cart__item-name');
  for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == itemName) {
          alert('This item is already added to the cart')
          return
      }
  }
  let cartRowContents = `
  <img class="cart-item-image" src="${imageSrc}" width="80" height="80">
      <p class="cart__item-name">${itemName}</p>
      <p class="cart__item-price">${itemPrice + " грн."}</p>
      <div class="cart__item-quantity flex-row">
          <input class="cart__item-quantity-input" type="number" min="1" value="1">
          <button class="cart__item-quantity-button btn-delete button" type="button"></button>
      </div>`
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  //tracking actions to remove or change the quantity
  let cartItemDelete = cartRow.querySelector('.btn-delete');
  let cartItemQuantity = cartRow.querySelector('.cart__item-quantity-input');
  cartItemDelete.addEventListener('click', removeCartItem);
  cartItemQuantity.addEventListener('change', quantityChanged);
  updateTotalQuantity();
  updateTotalCost()
}

//delete item from the cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotalQuantity();
  updateTotalCost()
  emptyCartCheck();
}

//update information about the cart total cost
function updateTotalCost() {
  let cartItemContainer = document.querySelector('.cart__items');
  let cartRows = cartItemContainer.getElementsByClassName('grid-row');
  totalCost = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart__item-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart__item-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('грн.', ''));
    let quantity = quantityElement.value;
    totalCost = totalCost + (price * quantity);
  }
  totalCost = Math.round(totalCost * 100) / 100;
  document.getElementById('cartTotalCost').innerText = `${totalCost} грн.`;
  updateTotalQuantity();
  emptyCartCheck ()
}

let quantityInputs = document.getElementsByClassName('cart__item-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateTotalCost();
  emptyCartCheck ();
}

function updateTotalQuantity() {
  let inputs = document.getElementsByClassName('cart__item-quantity-input');
  let array = [];
  for (let i = 0; i < inputs.length; i++) {
      array[i] = inputs[i].valueAsNumber;
  }
  const sum = (previousValue, currentValue) => previousValue + currentValue;
  if (array.length == 0) {
    emptyCart();
  } else {
    let total = array.reduce(sum);
    let quantityText = " ";
    if (total==1) {
      quantityText = "товар" 
    } else if (total==2 || total==3 || total==4)  {
      quantityText = "товари"
    }  else {
      quantityText = "товарів"
    }
    let cartQuantity = function() {
      document.getElementById("quantity").textContent=total + "  " + quantityText
    }
  }
  updateTotalQuantity();
  emptyCartCheck ();
}



document.getElementById("btnPurchase").addEventListener('click', purchaseClicked)

function purchaseClicked() {
  alert('Thank you for your purchase');
  let cartItems = document.getElementsByClassName('cart__items')[0];
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateTotalCost();
  emptyCartCheck ();
}


//check if the cart is empty
function emptyCartCheck () {
  let emptyCart = document.getElementsByClassName("cart__item");
  if (emptyCart.length == 0) {
  cartButton.disabled=true;
  document.getElementsByClassName("cart__item-quantity-input")[0].value = 0;
  } else {
  cartButton.disabled=false;
  }
  console.log(document.getElementsByClassName("cart__item-quantity-input")[0].value)
}

function emptyCart() {
  totalQuantity = 0;
  document.getElementById("quantity").textContent=totalQuantity + "  товарів";
  totalCost = 0;
  document.getElementById('cartTotalCost').innerText = `${totalCost} грн.`;
  cartButton.disabled = true;
}