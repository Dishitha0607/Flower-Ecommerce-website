const cartContainer = document.getElementById("cart-container");
const grandTotal = document.getElementById("grand-total");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>₹${item.price}</p>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            <p>₹${itemTotal}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    grandTotal.innerText = total;
}

function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();
}

cartContainer.addEventListener("input", function(e) {
    if (e.target.tagName === "INPUT") {
        const index = e.target.dataset.index;
        cartItems[index].quantity = parseInt(e.target.value);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCart();
    }
});

displayCart();
