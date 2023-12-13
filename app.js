let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let filterInput = document.querySelector('#filterInput');

let products = [
    { id: 1, name: 'PRODUCT NAME 1', image: '1.PNG', price: 120 },
    { id: 2, name: 'PRODUCT NAME 2', image: '2.PNG', price: 124 },
    { id: 3, name: 'PRODUCT NAME 3', image: '2.PNG', price: 149 }
];

// Array to store selected items in the cart
let listCards = [];

// Function to create a cart item HTML element
function createCartItem(item) {
    let cartItem = document.createElement('li');
    cartItem.innerHTML = `
        <div><img src="image/${item.image}" alt="${item.name}"/></div>
        <div>${item.name}</div>
        <div>${item.price * item.quantity}kr</div>
        <div>
            <button onclick="changeQuantity(${item.id - 1}, ${item.quantity - 1})">-</button>
            <div class="count">${item.quantity}</div>
            <button onclick="changeQuantity(${item.id - 1}, ${item.quantity + 1})">+</button>
        </div>`;
    return cartItem;
}

// Function to add a product to the cart
function addToCard(index) {
    let productElement = document.querySelector(`.item[data-id="${index + 1}"]`);

    if (productElement) {
        let existingItem = listCards.find(item => item && item.id === parseInt(productElement.dataset.id, 10));

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
                quantity: 1
            });
        }

        // Reload the cart to reflect changes
        reloadCard();
    }
}

// Function to reload the shopping cart
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((item) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;
        listCard.appendChild(createCartItem(item));
    });

    // Update total and quantity display
    total.innerText = totalPrice + 'kr';
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

// Function to filter products based on the input value
function filterProducts() {
    let filterValue = filterInput.value.toLowerCase();

    // Filter products based on the input value
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(filterValue));

    // Update the displayed products
    displayProducts(filteredProducts);
}

// Function to display products on the page
function displayProducts(products) {
    list.innerHTML = '';

    products.forEach((product) => {
        let productElement = document.createElement('div');
        productElement.classList.add('item');
        productElement.dataset.id = product.id;
        productElement.dataset.name = product.name;
        productElement.dataset.image = product.image;
        productElement.dataset.price = product.price;

        productElement.innerHTML = `
            <img src="image/${product.image}" alt="${product.name}">
            <div class="title">${product.name}</div>
            <div class="price">${product.price}kr</div>
            <button onclick="addToCard(${product.id - 1})">Add To Cart</button>`;

        list.appendChild(productElement);
    });
}


// Event listener for opening the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Event listener for closing the shopping cart
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Event listener for filtering products
filterInput.addEventListener('input', filterProducts);

// Initial display of products
displayProducts(products);