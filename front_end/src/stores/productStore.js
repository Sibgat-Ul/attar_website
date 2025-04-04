import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import ProductService from "@/service/ProductService";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);
  const fragranceFilter = ref("");
  const nameFilter = ref("");
  const categoryFilter = ref("");

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/sheet', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  async function fetchProducts() {
    try {
      const data = await ProductService.getProductsSmall();
      products.value = data.map(product => ({
        ...product,
        image: "/src/assets/images/Romance.webp" // Assigning a default image
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Combined filter for category, fragrance, and name
  const filteredProducts = computed(() => {
    let filtered = products.value;

    // Apply category filter
    if (categoryFilter.value && categoryFilter.value !== "All") {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === categoryFilter.value.toLowerCase()
      );
    }

    // Apply fragrance filter
    if (fragranceFilter.value && fragranceFilter.value !== "All") {
      filtered = filtered.filter(product =>
        product.fragranceType?.toLowerCase().includes(fragranceFilter.value.toLowerCase())
      );
    }

    // Apply name filter
    if (nameFilter.value) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(nameFilter.value.toLowerCase())
      );
    }

    return filtered;
  });

  return {
    products,
    fetchProducts,
    fragranceFilter,
    nameFilter,
    categoryFilter,
    filteredProducts // Use this computed property in your ShopView
  };
});