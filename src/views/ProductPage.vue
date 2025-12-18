<script setup>
import Footer from "@/components/footer.vue";
import ProductCard from "@/components/ProductCard.vue";
import { getAllProducts } from "@/services/productService";
import { computed, onMounted, ref } from "vue";
const products = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const error = ref(null);

// Fetch all products
const fetchProducts = async () => {
  try {
    const data = await getAllProducts();
    products.value = data;
  } catch (err) {
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);

// Filtered products based on search query
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="products-page">
    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search products..."
      class="search-bar"
    />

    <p v-if="loading">Loading products...</p>
    <p v-if="error">{{ error }}</p>

    <!-- Products Grid -->
    <div class="products-grid" v-if="filteredProducts.length">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
      />
    </div>

    <p v-if="!loading && !filteredProducts.length">No products found.</p>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.products-page {
  padding: 20px;
  text-align: center;
}

/* Search bar */
.search-bar {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin-bottom: 25px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* Products grid */
.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>
