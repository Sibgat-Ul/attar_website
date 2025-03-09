<template>
  <div class="card">
    
  </div>
</template>

<style scoped>
.card {
    font-family: "Nunito-Regular";
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from 'primevue/carousel';
import Button from "primevue/button";
import Tag from "primevue/tag";
import ProductService from "@/service/ProductService";

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
})

const products = ref();
const responsiveOptions = ref([
  {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
  }
]);

const getSeverity = (status) => {
  switch (status) {
      case 'INSTOCK':
          return 'success';

      case 'LOWSTOCK':
          return 'warn';

      case 'OUTOFSTOCK':
          return 'danger';

      default:
          return null;
  }
};

</script>