<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/stores/CartControl.js'; // Import the cart store
import Button from "primevue/button";

const isMenuOpen = ref(false);
const isCartOpen = ref(false);
const isWishlistOpen = ref(false);
const cartStore = useCartStore(); // Access the cart store

const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 200; // Adjust the threshold as needed
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};

const toggleWishlist = () => {
    isWishlistOpen.value = !isWishlistOpen.value;
};
</script>

<template>
    <div :class="['navbar', { 'sticky': isScrolled }]">
        <ul>
            <li class="logo">
                <RouterLink to="/">Attar</RouterLink>
            </li>

            <li class="hamburger" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </li>
        </ul>

        <ul :class="['links', { 'active': isMenuOpen }]">
            <li>
                <RouterLink to="#">New Arrivals</RouterLink>
            </li>
            <li>
                <RouterLink to="#">Best Sellers</RouterLink>
            </li>
            <li>
                <RouterLink to="#">Gift Packages</RouterLink>
            </li>
            <li>
                <RouterLink to="shop">Shop</RouterLink>
            </li>
            <li>
                <button @click="toggleCart" class="cart-button relative center flex justify-evenly items-center align-middle w-full">
                    <i class="pi pi-shopping-cart text-xl"></i>
                    <span>
                        ({{ cartStore.cart.length }})
                    </span>
                </button>
            </li>
            <li>
                <button @click="toggleWishlist" class="cart-button relative center flex justify-evenly items-center align-middle w-full">
                    <i class="pi pi-heart text-xl"></i>
                    <span>
                        ({{ cartStore.wishlist.length }})
                    </span>
                </button>
            </li>

            <li>
                <RouterLink to="#"><i class="pi pi-user"></i></RouterLink>
            </li>
        </ul>
    </div>

    <div :class="['cart-sidebar', { 'open': isCartOpen }]">
        <button class="close-cart" @click="toggleCart">&times;</button>
        <h2 class="sidebar-header">Shopping Cart</h2>
        <ul v-if="cartStore.cart.length">
            <li v-for="(item, index) in cartStore.cart" :key="index">
                {{ item.name }} - ${{ item.price }}
                <button @click="cartStore.removeFromCart(index)">
                    <i class="pi pi-times"></i>
                </button>
            </li>

            <li>Total: 0</li>
        </ul>
        <p v-else>Your cart is empty.</p>
    </div>

    <div :class="['cart-sidebar', { 'open': isWishlistOpen }]">
        <button class="close-cart" @click="toggleWishlist">&times;</button>
        <h2 class="sidebar-header">Wishlist</h2>
        <ul v-if="cartStore.wishlist.length">
            <li v-for="(item, index) in cartStore.wishlist" :key="index">
                {{ item.name }} - ${{ item.price }}
            </li>
        </ul>
        <p v-else>Your wishlist is empty.</p>
    </div>
</template>

<style scoped>
.cart-button {
    background-color: inherit;
    color: inherit;
}

.cart-button:hover {
    background-color: inherit;
    color: inherit;
}


.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6rem; /* Keep height fixed to avoid layout shift */
    background: #fff;
    font-family: "Nunito-Regular";
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    transition: background 0.3s ease-in-out, backdrop-filter 0.5s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    z-index: 1000;
}

.navbar.sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.85); /* Slightly transparent for blur effect */
    backdrop-filter: blur(12px); /* Smooth blur effect */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(0); /* Slide smoothly */
    opacity: 1;
}

.navbar:not(.sticky) {
    transform: translateY(-10px); /* Starts slightly above */
    opacity: 0.95; /* Slight transparency */
}


.navbar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    column-gap: 1rem;
}

.navbar .links {
    width: 60%;
}

.navbar .logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar li {
    text-align: center;
    min-width: 4rem;
}

.navbar .hamburger {
    display: none;
    font-size: 2rem;
    cursor: pointer;
}

.navbar > ul > li > a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    transition: color 0.3s;
    min-width: 1rem;
}

.navbar a:hover {
    color: #007bff;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100%;
    background: white;
    box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
    transition: 0.1s;
    padding: 1rem;
    overflow-y: auto;
    z-index: 1050;
}

.cart-sidebar.open {
    right: 0;
}

.sidebar-header {
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 2px solid #000;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

.close-cart {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

.products {
    display: flex;
    gap: 1rem;
    margin: 2rem;
}

.product {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 200px;
    text-align: center;
}

@media (max-width: 1024px) {
    .navbar .links {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 6rem;
        left: 0;
        width: 100%;
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        pointer-events: none;
    }
    
    .navbar .links.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .navbar .hamburger {
        display: block;
    }
}
</style>