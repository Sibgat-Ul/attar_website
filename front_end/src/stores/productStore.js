import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SHEET_ENDPOINT = 'api/sheet/';
const APPEND_ENDPOINT = 'append';
const READ_ENDPOINT = 'read';

export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);
  const fragranceFilter = ref("");
  const nameFilter = ref("");
  const categoryFilter = ref("");

  async function getProductById(id) {
    if (products.value.length === 0) {
      await fetchProducts();
    }

    return products.value.find(product => parseInt(product.id) === parseInt(id));
  }

  async function submitOrder(orderDetails) {
    try {
      const response = await fetch(`${API_BASE_URL}${SHEET_ENDPOINT}${APPEND_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: orderDetails }),
      });

      if (!response.ok) {
        console.log(response);
        // throw new Error('Network response was not ok');
      }

      return response.json();

    } catch (error) {
      console.error("Error submitting order:", error);
      return { status: 'error', message: 'Failed to submit order' };
    }
  }


  async function fetchProducts() {
    try {
      console.log(API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}${SHEET_ENDPOINT}${READ_ENDPOINT}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      products.value.push(...data.map(product => ({
        ...product,
      })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    return products.value;
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
    filteredProducts,
    getProductById,
    submitOrder
  };
});