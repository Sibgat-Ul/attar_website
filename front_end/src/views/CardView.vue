<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/CartControl.js';
import { useProductStore } from '@/stores/productStore.js';
import axios from 'axios';

const cartStore = useCartStore();
const route = useRoute();
const productStore = useProductStore();

const product = ref(null);
const sizes = [3, 6, 9, 12];

const userDetails = ref({
  fullName: 'asdfasdf',
  email: 'asdfasdf@gmail.com',
  phone: '01717171717',
  district: 'Dhaka',
  area: 'Uttara',
  areaCode: '12345',
  houseNo: '123',
  productName: '',
  productID: '',
  size: sizes[0],
  quantity: 1,
  price: 0
});

const showModal = ref(false);
const modalMessage = ref("");
const modalSuccess = ref(false);

function closeModal() {
  showModal.value = false;
}

// Message to show the order status
const message = ref("");

watch(
  () => userDetails.value.quantity,
  (newValue) => {
    if (newValue < 1) {
      userDetails.value.quantity = 1;
    }
    if (newValue > 10) {
      userDetails.value.quantity = 10;
    }
    userDetails.value.price = product.value.price * userDetails.value.quantity;
  }
);

async function submitOrder() {
  // Prepare the order in the expected order (12 fields)
  const orderArray = [
    userDetails.value.fullName,
    userDetails.value.email,
    userDetails.value.phone,
    userDetails.value.district,
    userDetails.value.area,
    userDetails.value.areaCode,
    userDetails.value.houseNo,
    userDetails.value.productID,
    userDetails.value.productName,
    userDetails.value.size,
    userDetails.value.quantity,
    userDetails.value.price
  ];

  try {
    const response = await productStore.submitOrder(orderArray);

    if (response && response.message === "Data appended successfully") {
      modalMessage.value = "Order submitted successfully!";
      modalSuccess.value = true;
    } else {
      modalMessage.value = response?.message || "Failed to submit order.";
      modalSuccess.value = false;
    }
    showModal.value = true;
  } catch (error) {
    console.error("Error submitting order:", error);
    modalMessage.value = "An error occurred while submitting.";
    modalSuccess.value = false;
    showModal.value = true;
  }
}

onMounted(async () => {
  await productStore.getProductById(route.params.id).then((p) => {
    product.value = p;
  });

  userDetails.value.productName = product.value.name;
  userDetails.value.productID = product.value.id;
  userDetails.value.price = product.value.price;
});
</script>

<template>
    <div v-if="product" class="product-view m-auto">
      <div class="product-container">
        <img :src="product.image" alt="Product Image" class="product-image sticky-image" />
        <div class="product-details">
          <h2 class="title" style="border-bottom: 1px solid #adadad;">{{ product.name }}</h2>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur ut rem fugit neque. Autem suscipit tempore earum facilis neque, libero optio dolorum doloribus odio sint esse mollitia atque quas!</p>
  
          <div class="input-group">
            <label for="size">Size:</label>
            <select v-model="userDetails.size" id="size" class="styled-input max-w-24" style="padding: 0.5px 8px;">
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
  
          <div class="input-group">
            <label for="quantity">Quantity:</label>
            <input v-model.number="userDetails.quantity" type="number" id="quantity" min="1" step="1" class="styled-input max-w-24" style="padding: 0.5px 8px;"/>
          </div>
  
          <p class="price">Price: BDT {{ userDetails.price }} TK</p>
  
          <div id="buy_form">
            <span>Order Details: </span>
            <form @submit.prevent="async () => await submitOrder()">
              <input v-model="userDetails.fullName" type="text" placeholder="Full Name" class="styled-input" required />
              <input v-model="userDetails.email" type="email" placeholder="Email" class="styled-input" required />
              <input v-model="userDetails.phone" type="number" placeholder="Phone Number" class="styled-input" required />
              <input v-model="userDetails.district" type="text" placeholder="District" class="styled-input" required />
              <input v-model="userDetails.area" type="text" placeholder="Area" class="styled-input" required />
              <input v-model="userDetails.areaCode" type="number" placeholder="Area Code" class="styled-input" required />
              <input v-model="userDetails.houseNo" type="text" placeholder="House No." class="styled-input" required />
              <button type="submit" class="styled-button">Order Now</button>
            </form>
            <p v-if="message">{{ message }}</p>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content" :class="{ success: modalSuccess, error: !modalSuccess }">
          <p>{{ modalMessage }}</p>
          <button @click="closeModal" class="modal-close">Close</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product_container">
        <p>Error:Product not found.</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  h2, span {
    font-size: 1.5rem;
    font-weight: 500;
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
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    width: 100%;
  }
  
  .styled-input {
    padding: 10px;
    background: #ffffff;
    border: 1px solid #adadad;
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

  .modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  text-align: center;
}
.modal-content.success { border: 2px solid #4caf50; }
.modal-content.error { border: 2px solid #f44336; }
.modal-close {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
  </style>
  