<script setup>
import { ref, onMounted, computed } from "vue";
import Carousel from '@/components/UI/Carousel.vue'; // Import custom carousel
import ProductService from "@/service/ProductService";
import CardContainer from "@/components/Card/CardContainer.vue";

// Hero carousel data
const heroSlides = ref([
  {
    src: '/src/assets/images/ban1.png',
    title: 'Luxury Fragrances',
    description: 'Discover your signature scent'
  },
  {
    src: '/src/assets/images/ban2.png', // Add more images
    title: 'New Arrivals',
    description: 'Fresh collections for every occasion'
  }
]);

// Product data
const products = ref();

onMounted(() => {
  ProductService.getProductsSmall()
    .then((data) => {
      products.value = data.slice(0, 5)
      
      products.value.forEach(e => {
        e.image = "/src/assets/images/Romance.webp"
      });
    }
  );
});
</script>

<template>
  <section class="main">
    <div class="hero">
      <!-- Custom Carousel Component -->
      <Carousel 
        :slides="heroSlides" 
        :autoplay="true" 
        class="hero-carousel"
      />
      
      <!-- Centered Text Overlay -->
      <div class="hero-text">
        <p>Explore the best collection of perfumes for both men and women.</p>
        <button>Shop Now</button>
      </div>
    </div>

    <div class="product-class">
      <CardContainer title="New Arrivals" :products="products" />
      <CardContainer title="Best Sellers" :products="products" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: 80vh;
  overflow: hidden;
}

.hero-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #111111;
  z-index: 10;
}

.hero-text > p {
  font-size: 2.7rem;
  font-weight: 700;
}

.hero-text > button {
  margin-top: 10px;
  background-color: #1a1a1a;
  color: #f8f8f8;
  height: 3.2rem;
  width: 8.5rem;
  padding: 2px;
  border: none;
  cursor: pointer;
}


@media (max-width: 1024px) {
  .hero-text p {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-text p {
    font-size: 1.5rem;
  }
}

/* Carousel styling adjustments */
:deep(.slide-image) {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

:deep(.slide-content) {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>