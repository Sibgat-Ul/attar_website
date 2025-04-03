<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductService from "@/service/ProductService";
import Button from "primevue/button";
import { useCartStore } from '@/stores/CartControl.js';
import axios from 'axios';

const cartStore = useCartStore();
const route = useRoute();
const product = ref(null);
const sizes = [3, 6, 9, 12];
const googleFormsAPI = "YOUR_GOOGLE_APPS_SCRIPT_URL"; // Replace with your URL

// Initialize user details with a default size (first in sizes array) and quantity
const userDetails = ref({
  fullName: '',
  email: '',
  phone: '',
  district: '',
  area: '',
  areaCode: '',
  houseNo: '',
  size: sizes[0],
  quantity: 1
});

// Message to show the order status
const message = ref("");

async function submitOrder() {
  try {
    // Use product.value and userDetails.value to access the current values
    const response = await axios.post(googleFormsAPI, {
      fullName: userDetails.value.fullName,
      email: userDetails.value.email,
      phone: userDetails.value.phone,
      district: userDetails.value.district,
      area: userDetails.value.area,
      areaCode: userDetails.value.areaCode,
      houseNo: userDetails.value.houseNo,
      productName: product.value.name,
      size: userDetails.value.size,
      quantity: userDetails.value.quantity,
      price: product.value.price
    });

    if (response.data.status === "success") {
      message.value = "Order submitted successfully!";
    } else {
      message.value = "Failed to submit order.";
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    message.value = "An error occurred while submitting.";
  }
}

onMounted(() => {
  ProductService.getProductsSmall().then((data) => {
    const productId = parseInt(route.params.id);
    product.value = data.find(p => p.id == productId) || null;
    if (product.value) {
      // Set a default image if needed.
      product.value.image = "/src/assets/images/Romance.webp";
    }
  });
});
</script>

<template>
    <div v-if="product" class="product-view m-auto">
      <div class="product-container">
        <img :src="product.image" alt="Product Image" class="product-image sticky-image" />
        <div class="product-details">
          <h2 class="title">{{ product.name }}</h2>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur ut rem fugit neque. Autem suscipit tempore earum facilis neque, libero optio dolorum doloribus odio sint esse mollitia atque quas!</p>
  
          <div class="input-group">
            <label for="size">Size:</label>
            <select v-model="userDetails.size" id="size" class="styled-input">
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
  
          <div class="input-group">
            <label for="quantity">Quantity:</label>
            <input v-model.number="userDetails.quantity" type="number" id="quantity" min="1" step="1" class="styled-input" />
          </div>
  
          <p class="price">Price: BDT {{ product.price * userDetails.quantity }} TK</p>
  
          <div id="buy_form">
            <h2>Purchase Details</h2>
            <form @submit.prevent="submitOrder">
              <input v-model="userDetails.fullName" type="text" placeholder="Full Name" class="styled-input" required />
              <input v-model="userDetails.email" type="email" placeholder="Email" class="styled-input" required />
              <input v-model="userDetails.phone" type="tel" placeholder="Phone Number" class="styled-input" required />
              <input v-model="userDetails.district" type="text" placeholder="District" class="styled-input" required />
              <input v-model="userDetails.area" type="text" placeholder="Area" class="styled-input" required />
              <input v-model="userDetails.areaCode" type="text" placeholder="Area Code" class="styled-input" required />
              <input v-model="userDetails.houseNo" type="text" placeholder="House No." class="styled-input" required />
              <button type="submit" class="styled-button">Order Now</button>
            </form>
            <p v-if="message">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Product not found.</p>
    </div>
  </template>
  
  <style scoped>
  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    border-bottom: 0.5rem solid #111;
  }
  
  .product-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    min-height: 100vh;
    padding-top: 80px;
  }
  
  .product-container {
    display: flex;
    gap: 1.5rem;
    max-width: 1024px;
    background: #ffffff;
    padding: 20px;
    width: 100%;
    align-items: flex-start;
  }
  
  .product-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    align-self: flex-start;
  }

  .sticky-image {
    position: sticky;
    top: 120px; /* Adjust based on navbar height */
    max-height: 70vh;
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }
  
  .styled-input {
    padding: 10px;
    background: #ffffff;
    border: 1px solid #1f1f1f;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    color: #1e1e1e;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .styled-input:focus {
    border-color: #000;
  }
  
  select.styled-input {
    appearance: none;
    cursor: pointer;
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  /* Button Styling */
  .styled-button {
    padding: 10px;
    background: #1e1e1e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
  }
  
  .styled-button:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    .product-container {
      flex-direction: column;
      align-items: center;
    }
    .product-details {
      width: 100%;
    }
    form {
      width: 100%;
    }

    .sticky-image {
        position:static;
        top: initial;
    }
  }
  </style>
  