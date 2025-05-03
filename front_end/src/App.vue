<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/UI/Nav.vue';
import Footer from './components/UI/Footer.vue';

</script>

<template>
  <header>
      <Nav />
  </header>

  <RouterView />

  <Footer></Footer>

</template>

<style scoped>
*, body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  font-size: 16px;
  background-color: #FFFFFF;
  color: #131313;
}

header {
  background: #FFFFFF;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
  nav {
    text-align: center;
    margin: auto;
    font-size: 1rem;
  }
} */
</style>

<style>
* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.wishlist-active {
  color: #f44336 !important;
}

.wishlist-active:hover {
  color: #f44336 !important;
}

.cart-btn {
  background-color: #fff;
}

.cart-active {
  background-color: #34d399 !important;
  color: #1e1e1e !important;
}
</style>
