<template>
  <div class="payment-animation">
    <!-- Animated Checkmark -->
    <div class="checkmark-container">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
    </div>

    <!-- Processing Animation -->
    <div class="processing" v-if="!paymentComplete">
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p class="processing-text">Processing Payment...</p>
    </div>

    <!-- Success Message -->
    <div class="success-message" v-if="paymentComplete">
      <h2>Payment Successful! 🎉</h2>
      <p class="notification-text">YOU WILL BE NOTIFIED THROUGH EMAIL</p>
      <div class="order-details">
        <p>Order ID: <strong>{{ orderId }}</strong></p>
        <p>Amount: <strong>€{{ amount.toFixed(2) }}</strong></p>
        <p>Date: <strong>{{ new Date().toLocaleDateString() }}</strong></p>
      </div>
      <p class="redirect-text">Redirecting to homepage in {{ countdown }} seconds...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  orderId: {
    type: String,
    default: `ORD${Date.now()}`
  },
  amount: {
    type: Number,
    required: true
  },
  redirectDelay: {
    type: Number,
    default: 5 // seconds
  }
});

const emit = defineEmits(['paymentComplete']);
const router = useRouter();

const paymentComplete = ref(false);
const countdown = ref(props.redirectDelay);

// Simulate payment processing
onMounted(() => {
  setTimeout(() => {
    paymentComplete.value = true;
    emit('paymentComplete');
    
    // Start countdown
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer);
        router.push('/');
      }
    }, 1000);
  }, 2500); // 2.5 second processing animation
});
</script>

<style scoped>
.payment-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 2rem;
}

/* Checkmark Animation */
.checkmark-container {
  margin-bottom: 2rem;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 100px #4bb71b;
  }
}

/* Processing Animation */
.processing {
  margin-top: 1rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1e90ff;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.processing-text {
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
}

/* Success Message */
.success-message {
  margin-top: 2rem;
  animation: fadeIn 0.5s ease-in;
}

.success-message h2 {
  color: #28a745;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.notification-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e90ff;
  background: #e8f4fc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #1e90ff;
  margin: 1.5rem 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(30, 144, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(30, 144, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(30, 144, 255, 0);
  }
}

.order-details {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
  text-align: left;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.order-details p {
  margin: 0.5rem 0;
  color: #555;
}

.redirect-text {
  color: #666;
  font-size: 0.95rem;
  margin-top: 1.5rem;
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
</style>