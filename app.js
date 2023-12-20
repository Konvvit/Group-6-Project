import db from './db.js'
// Selecting elements from the DOM
let openShopping = document.querySelector('.shopping')
let closeShopping = document.querySelector('.closeShopping')
let list = document.querySelector('.list')
let listCard = document.querySelector('.listCard')
let body = document.querySelector('body')
let total = document.querySelector('.total')
let quantity = document.querySelector('.quantity')
let addToCartButtons
let categoriesContainer = document.querySelector('.categories')
let categoryBtns = document.getElementsByClassName('category-btn')
// Event listener for opening the shopping cart
openShopping.addEventListener('click', () => {
  body.classList.add('active')
})

// Event listener for closing the shopping cart
closeShopping.addEventListener('click', () => {
  body.classList.remove('active')
})

// Array to store selected items in the cart
let listCards = []

// Function to create a cart item HTML element
function createCartItem(item) {
  let cartItem = document.createElement('li')
  cartItem.innerHTML = `
        <div><img src="${item.image}" alt="${item.name}"/></div>
        <div>${item.name}</div>
        <div>${item.price * item.quantity}kr</div>
        <div>
            <button onclick="changeQuantity('${item.id}', ${
    item.quantity - 1
  })">-</button>
            <div class="count">${item.quantity}</div>
            <button onclick="changeQuantity('${item.id}', ${
    item.quantity + 1
  })">+</button>
        </div>`
  return cartItem
}

// Function to add a product to the cart
function addToCard({ target: menuItem }) {
  let productElement = document.querySelector(
    `.item[data-id="${menuItem.closest('.item').dataset.id}"]`
  )

  if (productElement) {
    let existingItem = listCards.find(
      (item) => item && item.id === productElement.dataset.id
    )

    if (existingItem) {
      // Item already exists, update quantity
      existingItem.quantity += 1
    } else {
      // Item does not exist, add it to the list
      listCards.push({
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        image: productElement.dataset.image,
        price: parseInt(productElement.dataset.price, 10),
        quantity: 1,
      })
    }

    // Reload the cart to reflect changes
    reloadCard()
  }
}

// Function to reload the shopping cart
function reloadCard() {
  listCard.innerHTML = ''
  let count = 0
  let totalPrice = 0

  listCards.forEach((item) => {
    totalPrice += item.price * item.quantity
    count += item.quantity
    listCard.appendChild(createCartItem(item))
  })

  // Update total and quantity display
  total.innerText = totalPrice + 'kr'
  quantity.innerText = count
}

// Function to change the quantity of a product in the cart
window.changeQuantity = function (id, newQuantity) {
  const index = listCards.findIndex((item) => item.id === id)

  if (index !== -1) {
    if (newQuantity <= 0) {
      // Remove the item if the new quantity is less than or equal to 0
      listCards.splice(index, 1)
    } else {
      // Update the quantity of the item
      listCards[index].quantity = newQuantity
    }

    reloadCard()
  }
}

// Generate the menu items from the db.js
function mockDataTest() {
  list.innerHTML = ''

  for (const categoryKey in db) {
    if (Object.hasOwnProperty.call(db, categoryKey)) {
      const category = db[categoryKey]

      if (Array.isArray(category)) {
        category.forEach((product) => {
          const menuElement = document.createElement('div')
          menuElement.innerHTML = `<div class="item show"
                  data-id="${product.id}"
                  data-name="${product.name}"
                  data-image="${product.img}"
                  data-price="${product.price}"
                  data-category="${product.category}">
              <img src="${product.img}" alt="Product 2">
              <div class="title">${product.name}</div>
              <div class="price">${product.price}kr</div>
              <div class="beskrivning">${product.dsc}</div>
              <button class="add-to-cart">Add To Cart</button>
          </div>`
          list.appendChild(menuElement)
        })
      } else {
        console.error(`Invalid data format: ${categoryKey} is not an array`)
      }
    }
  }
  addToCartButtons = document.querySelectorAll('.add-to-cart')
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', addToCard)
  })
}

// filtering the menu items depending on the clicked category
function filterItemsByCategory(category) {
  // if the selected category is "visa alla", display all the items
  if (category === 'Visa Alla') {
    mockDataTest()
  } else {
    console.log(category)
    list.innerHTML = '' // Clear the existing items

    // a loop to iterate in the db.js and display only the items from the clicked category
    for (const product of db[category]) {
      const menuElement = document.createElement('div')
      menuElement.innerHTML = `
            <div class="item show" data-id="${product.id}" data-name="${
        product.name
      }" data-image="${product.img}" data-price="${product.price}">
                <img src="${product.img}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="description">${product.dsc}</div>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart">Add To Cart</button>
            </div>
        `
      list.appendChild(menuElement)
    }
    addToCartButtons = document.querySelectorAll('.add-to-cart')
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', addToCard)
    })
  }
}

mockDataTest()

// iterate in the db.js to generate and display categories buttons dynamically from the db.js
for (const category in db) {
  const categoryElement = document.createElement('button')
  categoryElement.classList.add('category-btn')
  categoryElement.innerHTML = `${category}`
  categoriesContainer.appendChild(categoryElement)
}

// Add .active class to the selected category and send the selected category to the filter function
for (const categoryBtn of categoryBtns) {
  categoryBtn.addEventListener('click', function () {
    const current = document.querySelector('.category-btn.active')
    if (current) {
      current.classList.remove('active')
    }

    this.classList.add('active')
    const selectedCategory = this.innerHTML
    console.log(`Category is: ${selectedCategory}`)

    // Filter and display items based on the selected category
    filterItemsByCategory(selectedCategory)
  })
}

// for (var i = 0; i < categoryBtns.length; i++) {
//   categoryBtns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//     console.log(`Category is : ${this.innerHTML}` )
//   });
// }

// No need for initApp as the products are already defined in HTML

//----------------------------------------------------------------------------------------//
// listens for a click on the .total div
document.querySelector('.total').addEventListener('click', function () {
  document.getElementById('message').style.display = 'block'
})
