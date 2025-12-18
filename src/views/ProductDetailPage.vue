<script setup>
import { getProductById } from "@/services/productService";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

const product = ref(null);
const mainImage = ref("");
const loading = ref(true);
const error = ref(null);
const addingToCart = ref(false);
const quantity = ref(1); // Added quantity selector

// Placeholder image
const placeholderImage = "/placeholder.png";

// Check if product is already in cart
const isInCart = computed(() => {
  if (!product.value) return false;
  return cartStore.items.some(item => item._id === product.value._id);
});

// Cart quantity for this product
const cartQuantity = computed(() => {
  if (!product.value) return 0;
  const cartItem = cartStore.items.find(item => item._id === product.value._id);
  return cartItem ? cartItem.quantity : 0;
});

// Fetch product by ID
const fetchProduct = async () => {
  try {
    product.value = await getProductById(route.params.id);

    if (product.value.images && product.value.images.length > 0) {
      mainImage.value = product.value.images[0];
    } else if (product.value.image) {
      mainImage.value = product.value.image;
    } else {
      mainImage.value = placeholderImage;
    }
  } catch (err) {
    error.value = "Failed to load product";
    console.error("Product fetch error:", err);
  } finally {
    loading.value = false;
  }
};

// Change main image
const setMainImage = (img) => {
  mainImage.value = img || placeholderImage;
};

// Add product to cart with quantity
const addToCart = async () => {
  if (!userStore.isLoggedIn) {
    // Redirect to login if not logged in
    router.push({ 
      path: "/login", 
      query: { redirect: route.fullPath } 
    });
    return;
  }

  if (!product.value.inStock) {
    alert("This product is out of stock");
    return;
  }

  addingToCart.value = true;

  try {
    // Add multiple items based on quantity
    for (let i = 0; i < quantity.value; i++) {
      await cartStore.addToCart(product.value);
    }
    
    // Show success feedback
    alert(`✅ Added ${quantity.value} ${product.value.name} to cart!`);
    
    // Optional: Update button text briefly
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.style.backgroundColor = '#28a745';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 1500);
    }
    
  } catch (err) {
    console.error("Add to cart error:", err);
    alert(err.message || "Failed to add item to cart");
  } finally {
    addingToCart.value = false;
  }
};

// Increase quantity
const increaseQuantity = () => {
  if (quantity.value < 10) {
    quantity.value++;
  }
};

// Decrease quantity
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// View cart
const goToCart = () => {
  router.push('/cart');
};

onMounted(() => {
  fetchProduct();
  // Ensure cart is loaded for current user
  if (userStore.isLoggedIn) {
    cartStore.loadCart();
  }
});
</script>

<template>
  <div class="product-detail-container">
    <p v-if="loading" class="loading">Loading product...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="product" class="product-detail-card">
      <!-- Left: Images -->
      <div class="product-images">
        <img
          :src="mainImage || placeholderImage"
          :alt="product.name"
          class="main-image"
        />
        <div class="thumbnails">
          <img
            v-for="(img, index) in (product.images && product.images.length ? product.images : [product.image || placeholderImage])"
            :key="index"
            :src="img || placeholderImage"
            :alt="product.name + ' ' + index"
            :class="{ active: mainImage === img }"
            @click="setMainImage(img)"
          />
        </div>
      </div>

      <!-- Right: Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <!-- Price and Cart Status -->
        <div class="price-cart-status">
          <p class="product-price">€{{ product.price.toFixed(2) }}</p>
          <div v-if="isInCart" class="cart-status">
            <span class="in-cart-badge">✅ In Cart ({{ cartQuantity }})</span>
            <button @click="goToCart" class="view-cart-btn">View Cart</button>
          </div>
        </div>
        
        <p class="product-description">{{ product.description }}</p>

        <!-- Categories -->
        <div class="categories" v-if="product.categories?.length">
          <span
            v-for="(cat, index) in product.categories"
            :key="index"
            class="category"
          >
            {{ cat }}
          </span>
        </div>

        <!-- Specs -->
        <ul class="specs" v-if="product.specs?.length">
          <li v-for="(spec, index) in product.specs" :key="index">{{ spec }}</li>
        </ul>

        <!-- Stock Status -->
        <p class="stock" :class="{ 
          'in-stock': product.inStock && product.quantityAvailable > 5,
          'low-stock': product.inStock && product.quantityAvailable <= 5,
          'out-of-stock': !product.inStock 
        }">
          <span v-if="product.inStock && product.quantityAvailable > 5">
            ✅ In Stock ({{ product.quantityAvailable }} available)
          </span>
          <span v-else-if="product.inStock && product.quantityAvailable <= 5">
            ⚠️ Low Stock (Only {{ product.quantityAvailable }} left)
          </span>
          <span v-else>
            ❌ Out of Stock
          </span>
        </p>

        <!-- Quantity Selector -->
        <div class="quantity-selector" v-if="product.inStock">
          <p>Quantity:</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity" :disabled="quantity >= 10">+</button>
          </div>
          <p class="quantity-note">Max 10 per order</p>
        </div>

        <!-- Action Buttons -->
        <div class="buttons">
          <router-link to="/products" class="btn back-btn">← Back to Products</router-link>
          
          <div class="cart-buttons">
            <button 
              class="btn add-to-cart-btn" 
              :disabled="!product.inStock || addingToCart"
              @click="addToCart"
            >
              <span v-if="addingToCart">Adding...</span>
              <span v-else-if="isInCart">Add More</span>
              <span v-else>Add to Cart</span>
            </button>
            
            <button 
              v-if="isInCart"
              @click="goToCart"
              class="btn go-to-cart-btn"
            >
              View Cart ({{ cartStore.totalItems }})
            </button>
          </div>
        </div>

        <!-- User Info Note -->
        <div v-if="!userStore.isLoggedIn" class="login-note">
          <p>🔒 <strong>Note:</strong> You need to login to add items to your cart.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep your existing styles and add these: */

.product-detail-container { 
  padding: 20px; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 70vh; 
}

.loading, .error { 
  font-size: 18px; 
  color: #555; 
}

.product-detail-card { 
  display: flex; 
  flex-direction: column; 
  max-width: 1000px; 
  width: 100%; 
  background: #fff; 
  border-radius: 12px; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); 
  overflow: hidden; 
}

@media (min-width: 768px) { 
  .product-detail-card { 
    flex-direction: row; 
  } 
}

.product-images { 
  flex: 1; 
  background: #f9f9f9; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 20px; 
}

.main-image { 
  width: 100%; 
  max-width: 450px; 
  border-radius: 10px; 
  object-fit: contain; 
  margin-bottom: 15px; 
}

.thumbnails { 
  display: flex; 
  gap: 10px; 
  flex-wrap: wrap; 
  justify-content: center; 
}

.thumbnails img { 
  width: 70px; 
  height: 70px; 
  object-fit: cover; 
  border-radius: 5px; 
  cursor: pointer; 
  border: 2px solid transparent; 
  transition: all 0.3s ease; 
}

.thumbnails img:hover { 
  border-color: #1e90ff; 
}

.thumbnails img.active { 
  border-color: #1e90ff; 
}

.product-info { 
  flex: 1; 
  padding: 30px 20px; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
}

.product-title { 
  font-size: 2rem; 
  font-weight: bold; 
  margin-bottom: 15px; 
  color: #222; 
}

.price-cart-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.product-price { 
  font-size: 1.8rem; 
  font-weight: 700; 
  color: #1e90ff; 
  margin: 0;
}

.cart-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.in-cart-badge {
  background: #d4edda;
  color: #155724;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.view-cart-btn {
  padding: 6px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.3s;
}

.view-cart-btn:hover {
  background: #218838;
}

.product-description { 
  font-size: 1rem; 
  line-height: 1.6; 
  color: #555; 
  margin-bottom: 25px; 
}

.categories { 
  margin-bottom: 15px; 
}

.category { 
  background: #eee; 
  padding: 4px 10px; 
  margin-right: 6px; 
  border-radius: 20px; 
  display: inline-block; 
  font-size: 0.85rem;
}

.specs { 
  margin-bottom: 15px; 
  padding-left: 20px;
}

.specs li { 
  margin-bottom: 5px; 
  color: #666;
}

.stock {
  font-weight: 500;
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
}

.in-stock {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.low-stock {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.out-of-stock {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.quantity-selector {
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.quantity-selector p {
  margin-bottom: 10px;
  font-weight: 500;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #333;
  border: 1px solid #ced4da;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: 0.2s;
}

.quantity-controls button:hover:not(:disabled) {
  background: #1e90ff;
  color: white;
  border-color: #1e90ff;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  font-size: 1.3rem;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.quantity-note {
  font-size: 0.85rem;
  color: #6c757d;
  margin: 5px 0 0;
}

.buttons { 
  display: flex; 
  flex-direction: column;
  gap: 15px; 
  margin-top: 20px;
}

.cart-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn { 
  padding: 12px 20px; 
  border-radius: 8px; 
  font-weight: 500; 
  cursor: pointer; 
  border: none; 
  transition: all 0.3s ease; 
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
}

.back-btn { 
  background: #6c757d; 
  color: white; 
  text-align: center;
}

.back-btn:hover { 
  background: #5a6268; 
}

.add-to-cart-btn { 
  background: #1e90ff; 
  color: #fff; 
  flex: 1;
  min-width: 150px;
}

.add-to-cart-btn:hover:not(:disabled) { 
  background: #187bcd; 
}

.add-to-cart-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.go-to-cart-btn {
  background: #28a745;
  color: white;
  flex: 1;
  min-width: 150px;
}

.go-to-cart-btn:hover {
  background: #218838;
}

.login-note {
  margin-top: 20px;
  padding: 12px 15px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  color: #856404;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .price-cart-status {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cart-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>