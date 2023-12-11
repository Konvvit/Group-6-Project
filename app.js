// Selecting elements from the DOM
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Event listener for opening the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Event listener for closing the shopping cart
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

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



// No need for initApp as the products are already defined in HTML

