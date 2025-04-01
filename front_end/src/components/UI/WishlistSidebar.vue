<script setup>
import { useCartStore } from '@/stores/CartControl.js';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  }
});

const cartStore = useCartStore();
</script>

<template>
  <div :class="['cart-sidebar', { 'open': isOpen }]">
    <button class="close-cart" @click="$emit('close')">&times;</button>
    <h2 class="sidebar-header">Wishlist</h2>
    
    <ul v-if="cartStore.wishlist.length" class="h-full flex flex-col">
      <li v-for="(item, index) in cartStore.wishlist" :key="index" class="cart-item flex items-center border-b-2 p-2">
        <div class="mini_img w-16 h-16 mr-4">
          <img :src="item.img" alt="Product image" class="w-full h-full object-cover rounded-md">
        </div>
        <div class="mini_desc flex-1">
          <p class="font-bold">{{ item.name }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: ${{ item.price }}</p>
        </div>
        <button class="remove-btn" @click="cartStore.removeFromWishlist(index)">
          <i class="pi pi-times"></i>
        </button>
      </li>
    </ul>
    <p v-else>Your wishlist is empty.</p>
  </div>
</template>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 1rem;
  overflow-y: auto;
  z-index: 1050;
}

.cart-sidebar.open {
  right: 0;
}

.sidebar-header {
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
}

.mini_img img {
  border-radius: 8px;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: red;
}
</style>
