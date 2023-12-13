import products from "./mockData.js";

// Selecting elements from the DOM
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let addToCartButtons;
let categoryBtns = document.getElementsByClassName("category-btn");
// Event listener for opening the shopping cart
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

// Event listener for closing the shopping cart
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

// Array to store selected items in the cart
let listCards = [];

// Function to create a cart item HTML element
function createCartItem(item) {
  let cartItem = document.createElement("li");
  cartItem.innerHTML = `
        <div><img src="${item.image}" alt="${item.name}"/></div>
        <div>${item.name}</div>
        <div>${item.price * item.quantity}kr</div>
        <div>
            <button onclick="changeQuantity(${item.id - 1}, ${
    item.quantity - 1
  })">-</button>
            <div class="count">${item.quantity}</div>
            <button onclick="changeQuantity(${item.id - 1}, ${
    item.quantity + 1
  })">+</button>
        </div>`;
  return cartItem;
}

// Function to add a product to the cart
function addToCard({ target: menuItem }) {
  let productElement = document.querySelector(
    `.item[data-id="${menuItem.closest(".item").dataset.id}"]`
  );
  console.log(productElement);
  if (productElement) {
    let existingItem = listCards.find(
      (item) => item && item.id === parseInt(productElement.dataset.id, 10)
    );

    if (existingItem) {
      // Item already exists, update quantity
      existingItem.quantity += 1;
    } else {
      // Item does not exist, add it to the list
      listCards.push({
        id: parseInt(productElement.dataset.id, 10),
        name: productElement.dataset.name,
        image: productElement.dataset.image,
        price: parseInt(productElement.dataset.price, 10),
        quantity: 1,
      });
    }

    // Reload the cart to reflect changes
    reloadCard();
  }
}

// Function to reload the shopping cart
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((item) => {
    totalPrice += item.price * item.quantity;
    count += item.quantity;
    listCard.appendChild(createCartItem(item));
  });

  // Update total and quantity display
  total.innerText = totalPrice + "kr";
  quantity.innerText = count;
}

// Function to change the quantity of a product in the cart
function changeQuantity(index, quantity) {
  if (quantity === 0) {
    // Remove the item if quantity becomes zero
    listCards = listCards.filter((item, i) => i !== index);
  } else {
    // Update the quantity of the item
    listCards[index].quantity = quantity;
  }

  // Reload the cart to reflect changes
  reloadCard();
}

function mockDataTest() {
  products.forEach((product) => {
    const menuElement = document.createElement("div");
    menuElement.innerHTML = 
        `<div class="item" 
            data-id="${product.id}" 
            data-name="${product.name}" 
            data-image="${product.image}" 
            data-price="${product.price}" 
            data-category="${product.category}">
        <img src="${product.image}" alt="Product 2">
        <div class="title">${product.name}</div>
        <div class="price">${product.price}${product.valuta}</div>
        <div class="beskrivning">${product.beskrivning}</div>
        <button class="add-to-cart">Add To Cart</button>
    </div>`;
    list.appendChild(menuElement);
    console.log(
      `Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`
    );
  });
  addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCard);
  });
}

mockDataTest();

for (var i = 0; i < categoryBtns.length; i++) {
  categoryBtns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


// No need for initApp as the products are already defined in HTML
