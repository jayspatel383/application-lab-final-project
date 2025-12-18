<template>
  <div class="product-card">
    <!-- Watch Image -->
    <img :src="product.image" :alt="product.name" />

    <!-- Watch Info -->
    <h3>{{ product.name }}</h3>
    <p class="price">€{{ product.price }}</p>

    <!-- Buttons Container -->
    <div class="buttons">
      <!-- View Button -->
      <router-link :to="`/product/${product._id}`" class="btn view-btn">
        View
      </router-link>
      
      <!-- Add to Cart Button -->
      <button 
        @click="handleAddToCart" 
        class="btn cart-btn"
        :disabled="addingToCart"
      >
        {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();
const addingToCart = ref(false);

const handleAddToCart = async () => {
  // Check if user is logged in
  if (!userStore.isLoggedIn) {
    alert('Please login to add items to your cart');
    router.push(`/login?redirect=${encodeURIComponent(router.currentRoute.value.fullPath)}`);
    return;
  }

  addingToCart.value = true;
  
  try {
    // Add to cart
    await cartStore.addToCart(props.product);
    
    // Optional: Show success message
    console.log(`✅ Added ${props.product.name} to cart!`);
    
    // Optional: Small animation/feedback
    const button = event.target;
    button.style.backgroundColor = '#28a745';
    setTimeout(() => {
      button.style.backgroundColor = '';
    }, 300);
    
  } catch (error) {
    console.error('❌ Failed to add to cart:', error.message);
    alert(error.message || 'Failed to add item to cart');
  } finally {
    addingToCart.value = false;
  }
};
</script>

<style scoped>
/* Product Card Container */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  width: 220px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
}

/* Hover effect */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Product Image */
.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* Product Name */
.product-card h3 {
  font-size: 18px;
  margin: 10px 0 5px;
  color: #333;
}

/* Price */
.product-card .price {
  font-size: 16px;
  color: #1e90ff;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Buttons Container */
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Base Button Style */
.btn {
  display: inline-block;
  padding: 8px 15px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: background 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
  text-align: center;
}

/* View Button */
.view-btn {
  background-color: #1e90ff;
}

.view-btn:hover {
  background-color: #0d6efd;
}

/* Add to Cart Button */
.cart-btn {
  background-color: #28a745;
}

.cart-btn:hover:not(:disabled) {
  background-color: #218838;
}

.cart-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsive Layout */
@media (max-width: 1024px) {
  .product-card {
    width: 45%;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .product-card {
    width: 100%;
  }
  
  .buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>