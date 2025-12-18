<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <!-- Checkout Header -->
      <div class="checkout-header">
        <h1 class="checkout-title">Checkout</h1>
        <div v-if="userInfo" class="user-greeting">
          <p>Hello, <strong>{{ userInfo.name }}</strong></p>
          <p class="user-email">{{ userInfo.email }}</p>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Your cart is empty!</p>
        <router-link to="/products" class="btn shop-btn">
          Shop Products
        </router-link>
      </div>

      <!-- Payment Success Overlay -->
      <div v-if="showPaymentMessage" class="payment-overlay">
        <div class="payment-success">
          <div class="success-icon">✅</div>
          <h2>Thank You for Shopping!</h2>
          <p class="notification">YOU WILL BE NOTIFIED THROUGH EMAIL</p>
          
          <div class="order-info">
            <p><strong>Order ID:</strong> {{ orderId }}</p>
            <p><strong>Amount:</strong> €{{ finalTotal.toFixed(2) }}</p>
            <p><strong>Date:</strong> {{ new Date().toLocaleDateString() }}</p>
          </div>
          
          <p class="redirect-message">
            Redirecting to homepage in {{ countdown }} seconds...
          </p>
          
          <button @click="goHomeNow" class="home-btn">
            Go Home Now
          </button>
        </div>
      </div>

      <!-- Checkout Content -->
      <div v-else class="checkout-content">
        <!-- Order Summary -->
        <div class="order-section">
          <h2 class="section-title">Order Summary</h2>
          
          <!-- Items List -->
          <div class="items-list">
            <div 
              class="checkout-item" 
              v-for="item in cartStore.items" 
              :key="item._id"
            >
              <img 
                :src="item.image || '/placeholder.png'" 
                :alt="item.name" 
                class="item-img" 
              />
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">€{{ item.price.toFixed(2) }}</p>
                <div class="item-controls">
                  <div class="quantity">
                    <button 
                      @click="decreaseQty(item)" 
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQty(item)">
                      +
                    </button>
                  </div>
                  <p class="item-total">
                    €{{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
              <button 
                class="remove-btn" 
                @click="removeFromCart(item)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary & Payment -->
        <div class="summary-section">
          <div class="summary-card">
            <h2 class="section-title">Order Details</h2>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            
            <div class="summary-row">
              <span>Shipping</span>
              <span v-if="cartStore.totalPrice > 50" class="free-shipping">
                FREE
              </span>
              <span v-else>€9.99</span>
            </div>
            
            <div class="summary-row">
              <span>Tax (21% VAT)</span>
              <span>€{{ (cartStore.totalPrice * 0.21).toFixed(2) }}</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-row total-row">
              <span><strong>Total</strong></span>
              <span><strong>€{{ finalTotal.toFixed(2) }}</strong></span>
            </div>

            <!-- Checkout Button -->
            <button 
              class="confirm-btn" 
              @click="handleCheckout"
              :disabled="cartStore.items.length === 0 || paymentProcessing"
            >
              {{ paymentProcessing ? 'Processing...' : `Pay €${finalTotal.toFixed(2)}` }}
            </button>

            <!-- Back to Cart -->
            <router-link to="/cart" class="back-to-cart">
              ← Back to Cart
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { computed, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();

// Payment state
const showPaymentMessage = ref(false);
const paymentProcessing = ref(false);
const countdown = ref(5);
const orderId = ref('');

// Load cart on mount
onMounted(() => {
  console.log('📱 CheckoutPage mounted');
  if (!userStore.isLoggedIn) {
    console.log('❌ Not logged in, redirecting to login');
    router.push({ 
      path: "/login", 
      query: { redirect: "/checkout" } 
    });
  } else {
    console.log('✅ User logged in, loading cart');
    cartStore.loadCart();
  }
});

// User info
const userInfo = computed(() => {
  if (userStore.user) {
    return {
      name: userStore.user.name || userStore.user.email?.split('@')[0] || 'Customer',
      email: userStore.user.email || 'No email'
    };
  }
  return null;
});

// Calculate totals
const shippingCost = computed(() => 
  cartStore.totalPrice > 50 ? 0 : 9.99
);

const taxAmount = computed(() => 
  cartStore.totalPrice * 0.21
);

const finalTotal = computed(() => 
  cartStore.totalPrice + shippingCost.value + taxAmount.value
);

// Cart actions
const increaseQty = (item) => {
  cartStore.increaseQty(item);
};

const decreaseQty = (item) => {
  cartStore.decreaseQty(item);
};

const removeFromCart = (item) => {
  if (confirm(`Remove ${item.name} from cart?`)) {
    cartStore.removeFromCart(item);
  }
};

// Navigation
const goHomeNow = () => {
  router.push('/');
};

// Checkout function
const handleCheckout = async () => {
  console.log('💰 Starting checkout process');
  
  if (!userStore.isLoggedIn) {
    alert('Please login to checkout');
    router.push('/login');
    return;
  }
  
  if (cartStore.items.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  paymentProcessing.value = true;
  console.log('⏳ Payment processing started');
  
  try {
    // Simulate payment processing (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    orderId.value = `ORD${Date.now().toString().slice(-6)}`;
    console.log('📝 Order ID:', orderId.value);
    
    // Save order to localStorage
    const orderData = {
      orderId: orderId.value,
      userId: userStore.user?._id || userStore.user?.id,
      items: cartStore.items,
      total: finalTotal.value,
      date: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('💾 Order saved');
    
    // Clear cart
    cartStore.clearCart();
    console.log('🛒 Cart cleared');
    
    // Show success message
    showPaymentMessage.value = true;
    paymentProcessing.value = false;
    console.log('✅ Payment successful, showing message');
    
    // Start countdown
    countdown.value = 5;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer);
        router.push('/');
      }
    }, 1000);
    
  } catch (error) {
    console.error('❌ Checkout error:', error);
    alert('Payment failed. Please try again.');
    paymentProcessing.value = false;
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 2rem 1rem;
  min-height: 80vh;
  background: #f9f9f9;
}

.checkout-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.checkout-header {
  margin-bottom: 2rem;
}

.checkout-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.user-greeting {
  background: #e8f4fc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #1e90ff;
}

.user-greeting p {
  margin: 0.3rem 0;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.shop-btn {
  background: #1e90ff;
  color: white;
}

.shop-btn:hover {
  background: #0d6efd;
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 992px) {
  .checkout-content {
    flex-direction: row;
  }
  
  .order-section {
    flex: 2;
  }
  
  .summary-section {
    flex: 1;
  }
}

.order-section, .summary-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #eee;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.checkout-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  border: 1px solid #eee;
  border-radius: 10px;
  transition: box-shadow 0.3s;
}

.checkout-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.item-price {
  color: #1e90ff;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
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
}

.remove-btn {
  padding: 0.6rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
  white-space: nowrap;
}

.remove-btn:hover {
  background: #e63946;
}

/* Summary Section */
.summary-card {
  position: sticky;
  top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.free-shipping {
  color: #28a745;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 1.2rem 0;
}

.total-row {
  font-size: 1.2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
}

.confirm-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;
}

.confirm-btn:hover:not(:disabled) {
  background: #218838;
}

.confirm-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.back-to-cart {
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  color: #1e90ff;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem;
}

.back-to-cart:hover {
  text-decoration: underline;
}

/* Payment Overlay Styles */
.payment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.payment-success {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.3s ease;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.payment-success h2 {
  color: #28a745;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.notification {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e90ff;
  background: #e8f4fc;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.order-info {
  background: #f8f9fa;
  padding: 1.2rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: left;
}

.order-info p {
  margin: 0.5rem 0;
  color: #555;
}

.redirect-message {
  color: #666;
  margin: 1.5rem 0;
  font-size: 1rem;
}

.home-btn {
  padding: 0.8rem 2rem;
  background: #1e90ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  margin-top: 1rem;
}

.home-btn:hover {
  background: #0d6efd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-img {
    width: 100%;
    height: 180px;
  }
  
  .item-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .remove-btn {
    align-self: flex-end;
  }
  
  .payment-success {
    padding: 1.5rem;
  }
}
</style>