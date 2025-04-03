<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/UI/Nav.vue';
import Footer from './components/UI/Footer.vue';
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await fetch('http://192.168.88.48:3000/api/sheet/read', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const postData = async () => {
  const data = {
        values: [
            ["John Doe", "Some notes", "Product description", 100, "Electronics"]
        ]
    };

    try {
        const response = await axios.post('http://192.168.88.48:3000/api/sheet/append', data);
        console.log('Data appended successfully:', response.data);
        alert('Data appended successfully');
    } catch (error) {
        console.error('Error appending data:', error);
    }
}
</script>

<template>
  <header>
      <Nav />
  </header>

  <RouterView />

   <button @click="fetchData" class="bg-blue-500 text-white p-2 rounded">
     Read test
   </button>

   <button @click="postData" class="bg-blue-500 text-white p-2 rounded">
     Write test
   </button>

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
