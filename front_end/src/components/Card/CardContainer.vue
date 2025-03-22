<template>
    <div class="text-center">
        <h3 class="m-8 mb-0">
            {{ title }}
        </h3>

        <div class="products">
            <Card class="card text-start" v-for="product in props.products" :key="product.id">
                <template #header>
                    <div>
                        <img 
                            :src="product.image"
                            class="product_img rounded"
                            style="cursor: pointer;"
                            @click="$router.push(`/product/${product.id}`)" 
                        />
                    </div>
                </template>

                <template #title>
                    <p style="cursor: pointer;" class="font-medium flex justify-between items-center" @click="$router.push(`/product/${product.id}`)">
                        {{ product.name }}
                        <span class="ml-2">
                            <Tag :value="product.inventoryStatus" :severity="getSeverity(product.inventoryStatus)" />
                        </span>
                    </p>
                </template>

                <template #subtitle>
                    <p>{{ product.category }}</p>
                </template>

                <template #content>
                    <div class="info border-t-1">
                        <p>Notes: fruity, vanilla, musk, cinnamon</p>
                    </div>
                </template>

                <template #footer>
                    <div class="flex justify-between items-center">
                        <div class="mt-0 font-semibold text-md">BDT: {{ product.price }} TK</div>
                        <span>
                            <Button 
                                icon="pi pi-heart-fill" 
                                :class="{ 'wishlist-active': cartStore.isInWishList(product) }"
                                severity="secondary" 
                                class="min_btn wishlist-btn"
                                @click="cartStore.addToWishList(product)"
                            />

                            <Button 
                                icon="pi pi-cart-arrow-down" 
                                :class="{ 'cart-active': cartStore.isInCart(product) }"
                                severity="primary" 
                                class="min_btn ml-2 cart-btn"
                                @click="cartStore.addToCart(product)" 
                            />
                        </span>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { useCartStore } from '@/stores/CartControl.js';

const cartStore = useCartStore();

const props = defineProps({
  title: {
    type: String,
    required: false
  },

  products: {
    type: Array,
    required: true,
    default: () => []
  },
});

const getSeverity = (status) => {
  switch (status) {
      case 'IN STOCK':
          return 'success';

      case 'LOW STOCK':
          return 'warn';

      case 'OUT OF STOCK':
          return 'danger';

      default:
          return null;
  }
};
</script>

<style scoped>
    h3 {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 1.5em;
        font-weight: bold;
        border-bottom: 2px solid #1a1a1a;
        margin: 1rem auto;
        margin-bottom: .5rem;
        max-width: 25rem;
    }

    button.red:hover {
        color: #f44336;
        fill: #f44336;
    }
        
    .products {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
        gap: 0.7rem;
        padding: 2em 3.5em;
        align-content: center;
        justify-content: center;
        justify-items: center;
        width: 90%;
        margin: auto;
    }

    .product-card {
        background: #fff;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .product-card h3 {
        font-size: 1.2rem;
        margin: 0 0 0.5rem 0;
    }

    .product-card p {
        font-size: 1rem;
        margin: 0 0 1rem 0;
    }

    .product-card span {
        font-size: 1.1rem;
        font-weight: bold;
    }

    .card {
        font-family: "Nunito-Regular";
        max-width: 15em;
        overflow: hidden;
        background: #fff;
        color: #1e1e1e;
        border: 1px solid #fff;
        transition: border 1s;
    }

    .card:hover {
        border: 1px solid #d3d3d3;
        transition: border .2s;
    }

    .product_img {
        width: 100%;
        height: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease-out;
        width: 100%;
    }

    .product_img:hover {
        transform: scale(1);
        transition: transform 0.3s ease-in;
    }

    .wishlist-active {
        color: #f44336 !important;
    }
    

    .cart-btn {
        background-color: #fff !important;
    }

    .cart-active {
        background-color: #34d399 !important;
        color: #1e1e1e !important;
    }

</style>
  
