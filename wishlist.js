document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function renderWishlist() {
        wishlistContainer.innerHTML = "";

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = "<p>No items in wishlist.</p>";
            return;
        }

        wishlist.forEach(product => {
            const item = document.createElement('div');
            item.className = 'wishlist-item';
            item.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="remove-btn" data-id="${product.id}">Remove</button>
            `;
            wishlistContainer.appendChild(item);
        });

        // Add remove button logic
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.dataset.id;
                wishlist = wishlist.filter(p => p.id !== id);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                renderWishlist(); // Refresh UI
            });
        });
    }

    renderWishlist();
});
