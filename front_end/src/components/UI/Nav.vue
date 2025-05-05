<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/stores/CartControl.js';
import Button from "primevue/button";
import CartSidebar from '@/components/UI/CartSideBar.vue';
import WishlistSidebar from '@/components/UI/WishlistSidebar.vue';

const isMenuOpen = ref(false);
const isCartOpen = ref(false);
const isWishlistOpen = ref(false);
const cartStore = useCartStore();

const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 200;
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

<!-- <div :class="['navbar', { 'sticky': isScrolled }]">
  <ul>
    <li>
      <RouterLink to="/">
        <div class="logo">
          <img alt="Vue logo" class="logo" src="../../assets/ZED black.svg" width="60" height="60" />
          <div class="logo_text">
            ZED Perfumes
          </div>
        </div>
      </RouterLink>
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
        <span>({{ cartStore.cart.length }})</span>
      </button>
    </li>
    <li>
      <button @click="toggleWishlist" class="cart-button relative center flex justify-evenly items-center align-middle w-full">
        <i class="pi pi-heart text-xl"></i>
        <span>({{ cartStore.wishlist.length }})</span>
      </button>
    </li>
    <li>
      <RouterLink to="#"><i class="pi pi-user"></i></RouterLink>
    </li>
  </ul>
</div> -->

<template>
  <nav :class="['navbar', { 'sticky': isScrolled }]">
      <ul>
        <RouterLink to="/" class="logo">
          <img alt="Vue logo" class="logo-image" src="../../assets/ZED black.svg" width="60" height="60" />
          <div class="logo-text">ZED Perfumes</div>
        </RouterLink>
      </ul>

      <ul class="links" :class="{ 'active': isMenuOpen }">
          <li><RouterLink to="#">Best Sellers</RouterLink></li>
          <li><RouterLink to="shop">Shop</RouterLink></li>

          <li>
              <button @click="toggleCart" class="cart-button relative center flex justify-evenly items-center align-middle w-full">
                  <i class="pi pi-shopping-cart text-xl"></i>
                  <span>({{ cartStore.cart.length }})</span>
              </button>
          </li>
          <li>
              <button @click="toggleWishlist" class="cart-button relative center flex justify-evenly items-center align-middle w-full">
                  <i class="pi pi-heart text-xl"></i>
                  <span>({{ cartStore.wishlist.length }})</span>
              </button>
          </li>
          <li><RouterLink to="#"><i class="pi pi-user"></i></RouterLink></li>
      </ul>
      
      <div class="hamburger" @click="toggleMenu">
          <i class="pi pi-bars"></i>
      </div>
  </nav>

  <CartSidebar v-if="isCartOpen" :isOpen="isCartOpen" @close="toggleCart" />
  <WishlistSidebar v-if="isWishlistOpen" :isOpen="isWishlistOpen" @close="toggleWishlist" />
</template>

<style scoped>
/* Your existing navbar styling here */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  background: #fff;
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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  opacity: 1;
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
  width: 40%;
}


.logo {
  display: flex;
  align-items: center;
}
.logo img {
  margin-right: 0.5rem;
}

.navbar .logo_text {
  font-size: 1rem;
  letter-spacing: 5px;
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
}

.navbar a:hover {
  color: #007bff;
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
