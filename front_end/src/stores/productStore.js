import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PRODUCT_ENDPOINT = 'api/products/get';

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
      const response = await fetch(`${API_BASE_URL}api/products/append`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: orderDetails }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  async function fetchProducts(fetchNew = false) {
    if (fetchNew) {
      const start = products.value.length;
      await fetchHomeProducts(start, 5);
      return;
    }

    // Only fetch if not already populated
    if (products.value.length > 0) return;

    try {
      const response = await fetch(`${API_BASE_URL}api/products/shop`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) throw new Error('Failed to fetch shop products');

      const data = await response.json();
      products.value = data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function fetchHomeProducts(start = 0, count = 5) {
    try {
      const response = await fetch(`${API_BASE_URL}${PRODUCT_ENDPOINT}?start=${start}&count=${count}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) throw new Error('Failed to fetch home products');

      const data = await response.json();

      // Add to products store, avoiding duplicates
      const newItems = data.filter(
        (item) => !products.value.some((p) => p.id === item.id)
      );
      products.value.push(...newItems);
    } catch (error) {
      console.error(`Error fetching home products:`, error);
    }
  }

  const filteredProducts = computed(() => {
    let filtered = products.value;

    if (categoryFilter.value && categoryFilter.value !== "All") {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === categoryFilter.value.toLowerCase()
      );
    }

    if (fragranceFilter.value && fragranceFilter.value !== "All") {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase().includes(fragranceFilter.value.toLowerCase())
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
    fetchHomeProducts,
    fragranceFilter,
    nameFilter,
    categoryFilter,
    filteredProducts,
    getProductById,
    submitOrder
  };
});
