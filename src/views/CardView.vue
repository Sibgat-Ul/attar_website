<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductService from "@/service/ProductService";
import Button from "primevue/button";
import { useCartStore } from '@/stores/CartWishlist.js';

const cartStore = useCartStore();
const route = useRoute();
const product = ref(null);

const userDetails = ref({
  fullName: '',
  email: '',
  phone: '',
  district: '',
  area: '',
  areaCode: '',
  houseNo: ''
});

onMounted(() => {
  ProductService.getProductsSmall()
    .then((data) => {
      const productId = parseInt(route.params.id);
      product.value = data.filter(p => p.id == productId)[0]
      product.value.image = "/src/assets/images/Romance.webp"
    }
  );
});
</script>

<template>
    <div v-if="product" class="product-view m-auto">
        <div class="product-container">
            <img :src="product.image" alt="Product Image" class="product-image" />
            <div class="product-details">
                <h2 class="title">{{ product.name }}</h2>
                <p><strong>Category:</strong> {{ product.category }}</p>
                <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur ut rem fugit neque. Autem suscipit tempore earum facilis neque, libero optio dolorum doloribus odio sint esse mollitia atque quas!</p>
                <p class="price">Price: BDT {{ product.price }} TK</p>
                
                <div class="button_section">
                    <Button class="btn" label="Buy Now" />
                    <Button icon="pi pi-heart-fill" :class="{ 'wishlist-active': cartStore.isInWishList(product) }" severity="secondary" @click="cartStore.addToWishList(product)" label="Favourite" class="wishlist-btn" />
                    <Button icon="pi pi-cart-arrow-down" :class="{ 'cart-active': cartStore.isInCart(product) }" severity="primary" @click="cartStore.addToCart(product)" label="Cart" class="cart-btn" />
                </div>

                <div id="buy_form">
                    <h2>Purchase Details</h2>
                    <form @submit.prevent="submitOrder">
                        <input v-model="userDetails.fullName" type="text" placeholder="Full Name" required />
                        <input v-model="userDetails.email" type="email" placeholder="Email" required />
                        <input v-model="userDetails.phone" type="tel" placeholder="Phone Number" required />
                        <input v-model="userDetails.district" type="text" placeholder="District" required />
                        <input v-model="userDetails.area" type="text" placeholder="Area" required />
                        <input v-model="userDetails.areaCode" type="text" placeholder="Area Code" required />
                        <input v-model="userDetails.houseNo" type="text" placeholder="House No." required />
                        <button type="submit">Order Now</button>
                    </form>
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
    border-bottom: .5rem solid #111;
}

.button_section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
}

.btn {
    flex: 1 1 auto;
    background-color: #ffffff;
    color: #1e1e1e;
    border: 1px solid #1e1e1e;
}

.btn:hover {
    background-color: #1e1e1e;
    color: #e0e0e0;
}

.product-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    min-height: 100vh;
    padding-top: 80px; /* Push content down to avoid navbar overlap */
}

.product-container {
    display: flex;
    gap: 1.5rem;
    max-width: 1024px;
    background: white;
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

.product-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
}

@media (max-width: 768px) {
    .product-container {
        flex-direction: column;
        align-items: center;
    }
    .product-details {
        width: 100%;
    }
    .button_section {
        flex-direction: column;
    }
    form {
        width: 100%;
    }
    input, button {
        width: 100%;
    }
}

#buy_form h2 {
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

input {
  padding: 10px;
  background: #ffffff;
  border: 1px solid #1f1f1f;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
}

button {
  padding: 10px;
  background: #1e1e1e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #333;
}
</style>