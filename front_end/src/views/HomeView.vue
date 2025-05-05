<script setup>
import { ref, onMounted, computed } from "vue";
import Carousel from '@/components/UI/Carousel.vue';
import CardContainer from "@/components/Card/CardContainer.vue";
import { useProductStore } from "@/stores/productStore";

const heroSlides = ref([
  {
    src: '/images/ban1.png',
    title: 'Luxury Fragrances',
    description: 'Discover your signature scent'
  },
  {
    src: '/images/ban2.png',
    title: 'New Arrivals',
    description: 'Fresh collections for every occasion'
  }
]);

const store = useProductStore();

// Load initial 10 products for home if not already loaded
onMounted(() => {
  if (store.products.length < 10) {
    store.fetchHomeProducts(0, 10); // this will update the store's product list directly
  }
});

// Use computed to slice top 5 and next 5 from global store
const bestProducts = computed(() => store.products.slice(0, 5));
const newProducts = computed(() => store.products.slice(5, 10));
</script>

<template>
  <section class="main">
    <div class="hero">
      <Carousel 
        :slides="heroSlides" 
        :autoplay="true" 
        class="hero-carousel"
      />
      <div class="hero-text">
          <h3>Embark on a Sensory Journey</h3>
          <p>Explore our curated collection of exquisite perfumes for every mood and occasion.</p>
          <button @click="$router.push('/shop/')"> Discover Our Scents </button>
      </div>
    </div>

    <div class="intro-text">
      <h2>Your Signature Scent Awaits</h2>
      <p>
        Whether you're seeking a timeless classic or a bold new fragrance, our curated collection 
        of premium perfumes helps you express yourself with elegance and confidence.
      </p>
    </div>

    <div class="category-highlights">
      <div class="highlight">
        <img src="https://www.perfumehousebd.com/wp-content/uploads/2025/03/CREED-AVENTUS-EDP-100ML-FOR-MEN.png" alt="For Him" />
        <h3>For Him</h3>
        <p>Refined, bold, and masculine scents tailored to leave a lasting impression.</p>
      </div>
      <div class="highlight">
        <img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1745944963-1742231483-1693509226-1663814707-carolina-herrera-good-girl-eau-de-parfum-1663814698.jpg?crop=1xw:1xh;center,top&resize=980:*" alt="For Her" />
        <h3>For Her</h3>
        <p>Elegant, romantic, and empowering fragrances for every occasion.</p>
      </div>
      <div class="highlight">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHtByf6FEkR6U1thd6M9ypwPxzDK-UNa3uCOfjlI3x0CFSqboB" alt="Unisex" />
        <h3>Unisex</h3>
        <p>Modern, versatile blends designed for everyone who appreciates fine scent.</p>
      </div>
    </div>

    <div class="product-class">
      <CardContainer title="Best Sellers" :products="bestProducts" />
      <CardContainer title="New Arrivals" :products="newProducts" />
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
    z-index: 10;
    color: #000000; /* Softer off-white */
    padding: 2rem;
    border-radius: 8px;
    /* Create a blurred background effect */
    backdrop-filter: blur(10px); /* Apply the blur effect */
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
}

.hero-text > h1 {
    font-size: clamp(2.5rem, 4vw, 4rem);
    margin-bottom: 0.5rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); /* Slightly softer shadow */
    color: #f0f0f0; /* Slightly lighter off-white for the heading */
}

.hero-text > p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    margin: 0 1rem 1rem;
    line-height: 1.5;
    color: #000000; /* Even softer off-white for the paragraph */
}

.hero-text > button {
    margin-top: 1.5rem;
    background-color: #1a1a1a; /* Keep the dark button style */
    color: #f8f8f8;
    height: 3.5rem;
    min-width: 120px;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    border: none; /* Removed the white border as per your implicit feedback */
    cursor: pointer;
    font-size: clamp(0.9rem, 1vw, 1.1rem);
    font-weight: 500;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.hero-text > button:hover {
    background-color: #333;
    color: #fff;
}

/* Adjust media queries for the new heading */
@media (max-width: 1024px) {
    .hero-text > h1 {
        font-size: clamp(2rem, 3.5vw, 3rem);
    }
    .hero-text > p {
        font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    }
}

@media (max-width: 768px) {
    .hero-text > h1 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
    }
    .hero-text > p {
        font-size: clamp(1rem, 3vw, 1.4rem);
    }
    .hero-text > button {
        width: auto;
        padding: 0.6rem 1.2rem;
        font-size: clamp(0.8rem, 2vw, 1rem);
    }
}

.intro-text {
  text-align: center;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.intro-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #222;
}

.intro-text p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.category-highlights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 1rem;
}

.highlight {
  flex: 1 1 250px;
  max-width: 300px;
  text-align: center;
}

.highlight img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.highlight h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.highlight p {
  font-size: 0.95rem;
  color: #666;
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
