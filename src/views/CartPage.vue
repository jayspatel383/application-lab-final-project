<script setup>
  import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { computed, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
// Pinia stores
const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();

// Load user's cart when component mounts
onMounted(() => {
  if (userStore.isLoggedIn) {
    console.log('🛒 Loading cart for user:', userStore.user?._id);
    cartStore.loadCart();
  } else {
    console.log('⚠️ No user logged in, cart will be empty');
  }
});

// Watch for user login/logout to reload cart
watch(() => userStore.isLoggedIn, (isLoggedIn) => {
  console.log('👤 User login status changed:', isLoggedIn);
  if (isLoggedIn) {
    console.log('🔄 User logged in, loading cart...');
    cartStore.loadCart();
  } else {
    console.log('👤 User logged out, clearing cart display');
  }
});
// Quantity handlers
const increaseQty = (item) => {
  if (!userStore.isLoggedIn) {
    alert('Please login to update cart');
    router.push('/login');
    return;
  }
  cartStore.increaseQty(item);
};

const decreaseQty = (item) => {
  if (!userStore.isLoggedIn) {
    alert('Please login to update cart');
    router.push('/login');
    return;
  }
  cartStore.decreaseQty(item);
};

// Remove item
const removeFromCart = (item) => {
  if (!userStore.isLoggedIn) {
    alert('Please login to update cart');
    router.push('/login');
    return;
  }
  cartStore.removeFromCart(item);
};

// Clear entire cart
const clearCart = () => {
  if (!userStore.isLoggedIn) return;
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart();
  }
};

// Checkout handler
const proceedToCheckout = () => {
  if (!userStore.isLoggedIn) {
    router.push({ 
      path: "/login", 
      query: { redirect: "/checkout" } 
    });
  } else if (cartStore.items.length === 0) {
    alert('Your cart is empty!');
  } else {
    router.push("/checkout");
  }
};

// User greeting
const userGreeting = computed(() => {
  if (userStore.user) {
    return userStore.user.name || userStore.user.email;
  }
  return 'Guest';
});
</script>

<template>
  <div class="cart-page">
    <div class="cart-container">
      <!-- User Greeting -->
      <div class="user-info" v-if="userStore.isLoggedIn">
        <p>Hello, <strong>{{ userGreeting }}</strong>! Here's your cart.</p>
      </div>
      
      <h1 class="cart-title">Your Cart</h1>

      <!-- Empty Cart Message -->
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p v-if="userStore.isLoggedIn">
          Your cart is empty for now. Start shopping!
        </p>
        <p v-else>
          Please login to see your cart items.
        </p>
        <div class="action-buttons">
          <router-link to="/products" class="btn shop-btn">Shop Products</router-link>
          <button 
            v-if="!userStore.isLoggedIn" 
            @click="router.push('/login')"
            class="btn login-btn"
          >
            Login to View Cart
          </button>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-else class="cart-content">
        <!-- Clear Cart Button -->
        <div class="cart-header">
          <p>Total Items: <strong>{{ cartStore.totalItems }}</strong></p>
          <button @click="clearCart" class="clear-btn">Clear Cart</button>
        </div>
        
        <div class="cart-items">
          <div class="cart-item" v-for="item in cartStore.items" :key="item._id">
            <img :src="item.image || '/placeholder.png'" :alt="item.name" class="item-img" />
            <div class="item-details">
              <h2 class="item-name">{{ item.name }}</h2>
              <p class="item-price">€{{ item.price.toFixed(2) }}</p>
              <div class="quantity-controls">
                <p class="quantity-label">Quantity:</p>
                <div class="quantity">
                  <button @click="decreaseQty(item)" :disabled="item.quantity <= 1">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQty(item)">+</button>
                </div>
              </div>
              <p class="item-total">
                Subtotal: €{{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
            <button class="remove-btn" @click="removeFromCart(item)">Remove</button>
          </div>
        </div>

        <!-- Total and Checkout -->
        <div class="cart-summary">
          <div class="summary-left">
            <p class="total-label">Total Price:</p>
            <p class="total-amount">€{{ cartStore.totalPrice.toFixed(2) }}</p>
          </div>
          <div class="summary-right">
            <button class="continue-btn" @click="router.push('/products')">
              Continue Shopping
            </button>
            <button class="checkout-btn" @click="proceedToCheckout">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 2rem 1rem;
  min-height: 80vh;
  background: #f9f9f9;
}

.cart-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.user-info {
  background: #e8f4fc;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #1e90ff;
}

.cart-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-cart p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: 0.3s;
  font-size: 0.95rem;
}

.shop-btn {
  background: #1e90ff;
  color: white;
}

.shop-btn:hover {
  background: #0d6efd;
}

.login-btn {
  background: #28a745;
  color: white;
}

.login-btn:hover {
  background: #218838;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
}

.clear-btn:hover {
  background: #e63946;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 10px;
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.item-price {
  color: #1e90ff;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.quantity-label {
  font-weight: 500;
  color: #666;
  margin: 0;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.quantity button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
}

.quantity button:hover:not(:disabled) {
  background: #1e90ff;
  color: white;
  border-color: #1e90ff;
}

.quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity span {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-weight: 600;
  color: #28a745;
  margin-top: 0.5rem;
}

.remove-btn {
  padding: 0.6rem 1.2rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
}

.remove-btn:hover {
  background: #e63946;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 2px solid #eee;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.summary-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.total-label {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e90ff;
  margin: 0;
}

.summary-right {
  display: flex;
  gap: 1rem;
}

.continue-btn {
  padding: 0.8rem 1.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.continue-btn:hover {
  background: #545b62;
}

.checkout-btn {
  padding: 0.8rem 1.8rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.checkout-btn:hover {
  background: #218838;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .cart-container {
    padding: 1.5rem;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  
  .item-img {
    width: 100%;
    height: 180px;
  }
  
  .cart-summary {
    flex-direction: column;
    align-items: stretch;
  }
  
  .summary-left, .summary-right {
    width: 100%;
    justify-content: center;
  }
  
  .summary-right {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>