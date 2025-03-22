import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import ProductService from "@/service/ProductService";

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);
  const fragranceFilter = ref("");
  const nameFilter = ref("");
  const categoryFilter = ref("");

  // Fetch products from service
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

  // Filter products by fragrance type
  const filteredByFragrance = computed(() => {
    if (!fragranceFilter.value) return products.value;
    return products.value.filter(product =>
      product.fragranceType?.toLowerCase().includes(fragranceFilter.value.toLowerCase())
    );
  });

  // Filter products by name
  const filteredByName = computed(() => {
    if (!nameFilter.value) return filteredByFragrance.value;
    return filteredByFragrance.value.filter(product =>
      product.name?.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
  });

  // Combined filter for category, fragrance, and name
  const filteredProducts = computed(() => {
    let filtered = products.value;

    if (categoryFilter.value) {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === categoryFilter.value.toLowerCase()
      );
    }

    if (fragranceFilter.value) {
      filtered = filtered.filter(product =>
        product.fragranceType?.toLowerCase().includes(fragranceFilter.value.toLowerCase())
      );
    }

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