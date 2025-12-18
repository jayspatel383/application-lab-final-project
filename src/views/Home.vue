<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <i><h1>latest arrivals</h1></i>
        <p>Discover amazing deals and top-quality watches</p>
        <router-link to="/products" class="btn">Shop Now</router-link>
      </div>
      <div class="hero-image">
        <img src="/src/assets/banner watch.jpeg" alt="Hero Banner" />
      </div>
    </section>

  <!-- Featured Categories -->
<section class="categories">
  <h2>Shop by Category</h2>
  <div class="category-grid">
    <router-link to="/products?category=digital" class="category-banner">
        <img src="/src/assets/fancy watch.jpeg" alt="My Image" />
      <div class="category-title">Fancy</div>
    </router-link>
    <router-link to="/products?category=chronograph" class="category-banner">
      <img src="/src/assets/chronograph watch banner.jpeg" alt="Chronograph" />
      <div class="category-title">Chronograph</div>
    </router-link>
    <router-link to="/products?category=classic" class="category-banner">
      <img src="/src/assets/classic watch banner.jpeg" alt="Classic" />
      <div class="category-title">Classic</div>
    </router-link>
    <router-link to="/products?category=smartwatch" class="category-banner">
      <img src="/src/assets/smart watch banner.jpeg" alt="Smart Watch" />
      <div class="category-title">Smart Watch</div>
    </router-link>
  </div>
</section>


    <!-- Featured Products -->
    <section class="featured-products">
      <h2>Featured Products</h2>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <div class="products-grid" v-if="products.length">
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product"
        />
      </div>
    </section>
  </div>
   <section class="info-features">
    <div class="feature">
      <div class="icon">🔄</div>
      <h3>Easy Exchange Policy</h3>
      <p>Hassle-free exchanges on all orders within 15 days.</p>
    </div>

    <div class="feature">
      <div class="icon">📦</div>
      <h3>7-Day Return Policy</h3>
      <p>Return products within 7 days of delivery for a full refund.</p>
    </div>

    <div class="feature">
      <div class="icon">💬</div>
      <h3>Best Customer Support</h3>
      <p>24/7 support to help you with any questions or issues.</p>
    </div>
  </section>
  <Footer></Footer>
</template>

<script setup>
import Footer from "@/components/footer.vue"; // use lowercase if file is lowercase
import ProductCard from "@/components/ProductCard.vue";
import { getAllProducts } from "@/services/productService"; // make sure filename matches exactly
import { onMounted, ref } from "vue";


// State
const products = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch featured products from backend
const fetchProducts = async () => {
  try {
    const allProducts = await getAllProducts();
    // Take first 4 products as featured
    products.value = allProducts.slice(0, 4);
  } catch (err) {
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}

/* Hero Section */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  flex-wrap: wrap;
  width: 90rem;
  align-self: center;
}
.hero-text {
  flex: 1;
  min-width: 250px;
}
.hero-text h1 {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #6bebff, #82f665, #f81eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.hero-text p {
  font-size: 18px;
  margin-bottom: 20px;
}
.btn {
  padding: 10px 20px;
  background: #1e90ff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.hero-image {
  flex: 1;
  min-width: 250px;
  text-align: center;
}
.hero-image img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
}

/* Featured Categories */
.categories {
  text-align: center;
}
.categories h2 {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #1d5de8, #f66565, #ffce1e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.category-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.category-banner {
  position: relative;
  display: block;
  width: 45%;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-banner img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-banner:hover img {
  transform: scale(1.05);
}

.category-title {
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .category-grid {
    flex-direction: column;
    align-items: center;
  }
  .category-banner {
    width: 90%;
    height: auto;
  }
  .category-banner img {
    height: 180px;
  }
}


/* Featured Products */
.featured-products {
  text-align: center;
}
.featured-products h2{
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #07225e, #2ef4f7, #87ff1e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  transition: transform 0.3s ease;

}
.products-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }
  .hero-image {
    margin-top: 20px;
  }
}



.info-features {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 60px;
  /* background-color: #f9f9f9; */
  flex-wrap: wrap;
  text-align: center;
}

.feature {
  flex: 1;
  min-width: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.icon {
  font-size: 36px;
  margin-bottom: 10px;
  color: #1e90ff;
}

.feature h3 {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.feature p {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 768px) {
  .info-features {
    flex-direction: column;
    gap: 15px;
    padding: 30px 20px;
  }

  .feature {
    width: 100%;
  }
}
</style>
