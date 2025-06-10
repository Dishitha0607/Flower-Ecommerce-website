document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const icon = this.querySelector('i');
            const productId = this.dataset.id;
            const name = this.dataset.name;
            const price = this.dataset.price;
            const img = this.dataset.img;

            // Toggle heart color
            icon.classList.toggle('active-heart');

            // Load existing wishlist
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

            const existing = wishlist.find(item => item.id === productId);

            if (existing) {
                // If already liked, remove it
                wishlist = wishlist.filter(item => item.id !== productId);
            } else {
                // Add new item
                wishlist.push({
                    id: productId,
                    name: name,
                    price: price,
                    img: img
                });
            }

            // Save updated wishlist
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    });
});
