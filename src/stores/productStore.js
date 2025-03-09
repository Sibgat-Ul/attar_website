import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ProductService from "@/service/ProductService";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


export const productStore = defineStore("productStore", () => {
    
    let products = ref([])

    ProductService.getProductsSmall().then((data) => {
            products.value = data.slice(0, 5)
            
            products.value.forEach(e => {
                e.image = "/src/assets/images/Romance.webp"
            })
        }
    );


})