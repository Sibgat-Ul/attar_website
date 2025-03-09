
<script setup>
import { ref, onMounted, computed } from "vue";
import Carousel from 'primevue/carousel';
import ProductService from "@/service/ProductService";
import CardContainer from "@/components/Card/CardContainer.vue";

let products = ref();

onMounted(() => {
  ProductService.getProductsSmall()
  .then((data) => (
    products.value = data.slice(0, 5)
  ));
})

let filtered_product = computed(
  (filter) => {
  }
)

const responsiveOptions = ref([
  {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
  },
  {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
  },
  {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
  }
]);

</script>


<template>
  <section class="main">

    <div class="product-class">
      <CardContainer :products="products" />
    </div>
  </section>
</template>

<style scoped>
  .hero {
    /* display: grid; */
    /* grid-template-columns: 2fr 1fr; */
    /* gap: .5rem; */
    position: relative; /* Allows child elements to be positioned absolutely */
    width: 100%;
    height: 100vh; /* Full viewport height for the hero section */
    overflow: hidden;
    width: 100%;
    height: auto;
    background: #f3f3f3;
    font-family: "Nunito-Regular";
    color:#000000;
    /* padding: 2rem; */
    place-content: center;
    place-items: center;
  }

  .hero-text {
    position: absolute; /* Positions the text relative to the hero section */
    top: 50%; /* Moves the text vertically to the middle */
    left: 50%; /* Moves the text horizontally to the middle */
    transform: translate(-50%, -50%); /* Centers the text precisely */
    text-align: center; /* Aligns text content to the center */
    color: #111111; /* Text color (adjust as needed) */
    z-index: 10; /* Ensures the text appears above the carousel */
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
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero > * {
    text-align: center;
    font-size: clamp(5px, 6vw, 1.5em);
  }

  .hero-content button {
    padding: 0.5rem 1rem;
    background: #000000;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  @media only screen and (max-width: 1320px) {
    .hero {
      grid-template-columns: 1fr;
    }
  }

</style>
