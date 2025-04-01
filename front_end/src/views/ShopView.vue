<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import CardContainer from "@/components/Card/CardContainer.vue";

// Use Vue Router
const route = useRoute();
const router = useRouter();

// Use the product store
const productStore = useProductStore();

// User input for filtering
const fragranceInput = ref("All");
const nameInput = ref("");
const categoryFilter = ref("All"); // Default to "All"
const showFilterPopup = ref(false);

// Fetch products when the component mounts
onMounted(() => {
  productStore.fetchProducts();
  applyFilterFromURL();
});

// Function to apply filters based on the URL query
const applyFilterFromURL = () => {
  const filterParam = route.query.filter; // Read filter from URL

  if (filterParam) {
    categoryFilter.value = filterParam;
    productStore.categoryFilter = filterParam;
  } else {
    categoryFilter.value = "All"; // Default to "All" if no filter is provided
    productStore.categoryFilter = "All";
  }
};

// Watch for changes in the route and reapply filters
watch(() => route.query.filter, applyFilterFromURL);

// Watch for manual input changes and update store filters
watch(nameInput, () => {
  productStore.nameFilter = nameInput.value;
});

watch(fragranceInput, () => {
  productStore.fragranceFilter = fragranceInput.value;
});

watch(categoryFilter, () => {
  productStore.categoryFilter = categoryFilter.value;
});

// Function to update the URL based on selected filter
const updateCategoryFilter = (filter) => {
  categoryFilter.value = filter; // Update local state
  productStore.categoryFilter = filter; // Update store
  router.push({ path: "/shop", query: { filter } }); // Update URL
};

// Access filtered products from the store
const products = computed(() => productStore.filteredProducts);
</script>

<template>
  <section class="main">
    <section class="filters">
      <input type="text" v-model="nameInput" placeholder="Search by Name" />

      <select v-model="fragranceInput">
        <option value="All">All Fragrances</option>
        <option value="Floral">Floral</option>
        <option value="Woody">Woody</option>
        <option value="Citrus">Citrus</option>
        <option value="Oriental">Oriental</option>
      </select>

      <select @change="updateCategoryFilter($event.target.value)">
        <option value="All">All Products</option>
        <option value="ForHim">For Him</option>
        <option value="ForHer">For Her</option>
        <option value="NewArrivals">New Arrivals</option>
        <option value="BestSellers">Best Sellers</option>
      </select>
    </section>

    <button class="filter-button" @click="showFilterPopup = true">Filter</button>

    <div v-if="showFilterPopup">
      <div class="filter-backdrop" @click="showFilterPopup = false"></div>

      <div class="filter-popup">
        <h3>Filter Products</h3>
        <input type="text" v-model="nameInput" placeholder="Search by Name" />

        <select v-model="fragranceInput">
          <option value="All">All Fragrances</option>
          <option value="Floral">Floral</option>
          <option value="Woody">Woody</option>
          <option value="Citrus">Citrus</option>
          <option value="Oriental">Oriental</option>
        </select>

        <select @change="updateCategoryFilter($event.target.value)">
          <option value="All">All Products</option>
          <option value="ForHim">For Him</option>
          <option value="ForHer">For Her</option>
          <option value="NewArrivals">New Arrivals</option>
          <option value="BestSellers">Best Sellers</option>
        </select>

        <button @click="showFilterPopup = false" class="close-filter">Apply Filters</button>
      </div>
    </div>

    <div class="product-class">
      <CardContainer :products="products" />
    </div>
  </section>
</template>

<style scoped>
.main {
  min-height: 100vh;
  background-color: white;
  padding-top: 120px;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: flex-end;
  padding: 0 20px;
}

.filters input,
.filters select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #1a1a1a;
  transition: border 0.3s ease;
  width: 200px;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #1a1a1a;
}

.filter-button {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  color: #1a1a1a;
  padding: 12px 20px;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;
  z-index: 999;
}

.filter-button:hover {
  background: #1a1a1a;
  color: white;
}

.filter-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.filter-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  animation: slide-up 0.3s ease-in-out;
  z-index: 1000;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.filter-popup input,
.filter-popup select {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #1a1a1a;
}

.close-filter {
  background: white;
  color: #1a1a1a;
  padding: 12px;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;
}

.close-filter:hover {
  background: #1a1a1a;
  color: white;
}

@media (max-width: 768px) {
  .filters {
    display: none;
  }

  .filter-button {
    display: block;
  }
}
</style>
