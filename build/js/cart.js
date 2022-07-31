// script for the Cart



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
  addItemToCart(itemName, itemPrice, imageSrc);
}

/* --Add and deliting items from the cart--*/

function addItemToCart(itemName, itemPrice, imageSrc) {
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart__item');
  cartRow.classList.add('grid-row');
  let cartRowContent = `
  <img class="cart-item-image" src="${imageSrc}" width="80" height="80">
      <p class="cart__item-name" name="item-name">${itemName}</p>
      <p class="cart__item-price">${itemPrice + " грн."}</p>
      <div class="cart__item-quantity flex-row">
          <input class="cart__item-quantity-input" type="number" min="1" value="1">
          <button class="cart__item-quantity-button btn-delete button" type="button"></button>
      </div>`
  cartRow.innerHTML = cartRowContent;

  let cartItems = document.getElementById('cartItems');                         
  let cartItemsNumber = cartItems.getElementsByClassName('cart__item').length;
  let dublicateItem;
  if (cartItemsNumber == 0) {
    cartItems.append(cartRow) } else {
    for (let i=0; i < cartItemsNumber; i++) {
      let cartItemName = cartItems.getElementsByClassName('cart__item-name')[i].innerHTML;
      if (cartItemName == itemName) {
        cartItems.getElementsByClassName('cart__item-quantity-input')[i].value++;
        dublicateItem = cartItemName;
        break;
        } else {
          dublicateItem = "no dublicate"}
    }
    if (dublicateItem == "no dublicate") {
      cartItems.append(cartRow);
    }
    dublicateItem = "";
  }

  updateTotalCost()
  updateTotalQuantity()

  let cartItemDelete = cartRow.querySelector('.btn-delete');
  cartItemDelete.addEventListener('click', removeCartItem);
  let cartItemQuantity = cartRow.querySelector('.cart__item-quantity-input');
  cartItemQuantity.addEventListener('change', quantityChanged);
  function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalCost()
    updateTotalQuantity()
    emptyCartCheck()
  }
}  
   

//tracking if items quantity was chenged
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updateTotalCost()
    updateTotalQuantity()
}

//update information about the cart total cost
function updateTotalCost() {
    let cartItems = document.querySelector('.cart__items');
    let cartRows = cartItems.getElementsByClassName('grid-row');
    let totalCost = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = cartRow.querySelector('.cart__item-price');
        let itemPrice = parseFloat(price.innerHTML.replace('грн.', ''));
        let itemQuantity = cartRow.querySelector('.cart__item-quantity-input').value;
        let itemCost = itemPrice * itemQuantity;
        totalCost = totalCost + itemCost;
        totalCost = Math.round(totalCost * 100) / 100;
        totalCostText = totalCost.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        document.getElementById('cartTotalCost').innerText = `${totalCostText} грн.`;
    }
}

//update information about the cart quantity of items
function updateTotalQuantity() {
    let inputs = document.getElementsByClassName('cart__item-quantity-input');
    let array = [];
    for (let i = 0; i < inputs.length; i++) {
        array[i] = inputs[i].valueAsNumber;
    }
    const sum = (previousValue, currentValue) => previousValue + currentValue;
    if (array.length == 0) {
        emptyCartCheck()
    } else {
      let quantityText = " "
      let total = array.reduce(sum);
      if (total==1) {
        quantityText = "товар" 
      } else if (total==2 || total==3 || total==4)  {
        quantityText = "товари"
      }  else {
        quantityText = "товарів"
      }
      document.getElementById("quantity").textContent=total + "  " + quantityText
    }
  }



//check if the cart is empty
function emptyCartCheck() {
    let cartItems = document.getElementsByClassName("cart__item");
    let cartButton = document.getElementById("btnPurchase");
    if (cartItems.length == 0) {
        totalQuantity = 0;
        document.getElementById("quantity").textContent=totalQuantity + "  товарів";
        totalCost = 0;
        document.getElementById('cartTotalCost').innerText = `${totalCost} грн.`;
        cartButton.disabled=true;
    } else {
        cartButton.disabled=false;
    }
  }

//action after purchase button clicked
document.getElementById("btnPurchase").addEventListener('click', purchaseClicked)
function purchaseClicked() {
    //alert('Thank you for your purchase');
    //let cartItems = document.querySelector('.cart__items');
    //while (cartItems.hasChildNodes()) {
        //cartItems.removeChild(cartItems.firstChild)
    //}
    //emptyCartCheck ();
  }


  //show and hide the Cart
let cart = document.getElementById('cart');
let cartBody = document.getElementById('cart-body');
let cartIcon = document.getElementById('cart-icon');

cartIcon.addEventListener("click", toggleCartVisibility);
function toggleCartVisibility() {
  cart.classList.remove('cart-hidden');
  cart.classList.add('cart-shown');
  updateTotalCost();
  document.addEventListener( 'click', (e) => {
    let clickedElement = e.target;
    if (clickedElement == cart ) {
      cart.classList.remove('cart-shown');
      cart.classList.add('cart-hidden');
    }
  });
}
