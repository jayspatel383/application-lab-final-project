// src/stores/cartStore.js - FIXED VERSION
import { defineStore } from "pinia";
import { computed, nextTick, ref, watch } from "vue";
import { useUserStore } from "./userStore";

export const useCartStore = defineStore("cart", () => {
  const userStore = useUserStore();
  const items = ref([]);

  // Get user ID safely
  const getUserId = () => {
  console.log('🔍 === DEBUG: GETTING USER ID ===');
  console.log('👤 userStore.user object:', userStore.user);
  
  if (!userStore.user) {
    console.log('❌ No user object found');
    return null;
  }
  
  // Check all possible ID locations - FIXED ORDER
  console.log('🔑 Checking for _id:', userStore.user._id);
  console.log('🔑 Checking for id:', userStore.user.id);
  console.log('📧 Checking for email:', userStore.user.email);
  
  // ✅ FIX: Use EMAIL first (most unique for your case)
  // Since both users have id: 12345, email is unique!
  const userId = userStore.user.email || userStore.user._id || userStore.user.id;
  
  console.log('✅ Selected user ID:', userId);
  console.log('📝 localStorage key will be: vue_shop_cart_' + userId);
  console.log('🔍 === END DEBUG ===');
  
  return userId;
};

  // Load cart for current user from localStorage
  const loadCart = () => {
    const userId = getUserId();
    console.log('🔄 LOADING CART for user ID:', userId);
    
    if (!userId) {
      console.log('❌ No user ID, clearing cart');
      items.value = [];
      return;
    }
    
    // Use more specific key to prevent conflicts
    const storageKey = `vue_shop_cart_${userId}`;
    console.log('🔑 Storage key:', storageKey);
    
    const saved = localStorage.getItem(storageKey);
    console.log('📦 Found saved cart data:', saved ? 'YES' : 'NO');
    
    if (saved) {
      try {
        items.value = JSON.parse(saved);
        console.log('✅ Cart loaded with', items.value.length, 'items:', items.value);
      } catch (e) {
        console.error('❌ Error parsing cart:', e);
        items.value = [];
      }
    } else {
      items.value = [];
      console.log('🆕 New empty cart created');
    }
  };

  // Save cart for current user to localStorage
  const saveCart = () => {
    const userId = getUserId();
    if (!userId) {
      console.log("❌ Cannot save cart: No user ID");
      return;
    }
    
    // Use more specific key
    const storageKey = `vue_shop_cart_${userId}`;
    console.log('💾 SAVING CART for user:', userId);
    console.log('🔑 Storage key:', storageKey);
    console.log('🛒 Items to save:', items.value);
    
    localStorage.setItem(storageKey, JSON.stringify(items.value));
    console.log('✅ Cart saved successfully');
  };

  // Watch items and save automatically
  watch(items, saveCart, { deep: true });

  // ✅ FIXED: Watch user changes with nextTick to ensure data is loaded
  watch(() => userStore.user, (newUser, oldUser) => {
    console.log('👤 USER CHANGED - From:', oldUser?._id, 'To:', newUser?._id);
    
    if (newUser) {
      // Wait for next tick to ensure user data is fully set
      nextTick(() => {
        console.log('⏰ Loading cart after user change...');
        loadCart();
      });
    } else {
      console.log('👋 User logged out, clearing cart');
      items.value = [];
    }
  }, { immediate: true });

  const addToCart = (product) => {
    console.log('➕ ADDING TO CART:', product.name);
    console.log('👤 Current user _id:', userStore.user?._id);
    
    // Check if user is logged in
    if (!userStore.isLoggedIn) {
      console.log('❌ User not logged in');
      throw new Error("Please login to add items to cart");
    }
    
    const userId = getUserId();
    if (!userId) {
      console.log('❌ No user ID found');
      throw new Error("User ID not found");
    }
    
    const existing = items.value.find(p => p._id === product._id);
    if (existing) {
      existing.quantity++;
      console.log('🔢 Increased quantity to:', existing.quantity);
    } else {
      items.value.push({ ...product, quantity: 1 });
      console.log('🆕 Added new item');
    }
    
    console.log('📊 Cart after add:', items.value);
  };

  const removeFromCart = (product) => {
    console.log('➖ Removing from cart:', product.name);
    items.value = items.value.filter(p => p._id !== product._id);
  };

  const increaseQty = (product) => {
    const item = items.value.find(p => p._id === product._id);
    if (item) {
      item.quantity++;
      console.log('➕ Increased quantity to:', item.quantity);
    }
  };

  const decreaseQty = (product) => {
    const item = items.value.find(p => p._id === product._id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        console.log('➖ Decreased quantity to:', item.quantity);
      } else {
        removeFromCart(product);
      }
    }
  };

  const clearCart = () => {
    console.log('🧹 Clearing cart');
    items.value = [];
    
    const userId = getUserId();
    if (userId) {
      const storageKey = `vue_shop_cart_${userId}`;
      localStorage.removeItem(storageKey);
      console.log('🗑️ Removed cart from localStorage:', storageKey);
    }
    
    console.log('✅ Cart cleared');
  };

  const totalPrice = computed(() =>
    items.value.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  );

  const totalItems = computed(() =>
    items.value.reduce((sum, p) => sum + p.quantity, 0)
  );

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
    totalItems,
    loadCart,
    saveCart
  };
});