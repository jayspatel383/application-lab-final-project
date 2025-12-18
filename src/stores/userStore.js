import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  // Login user
  const loginUser = (userData) => {
    console.log('👤 === USERSTORE: LOGIN USER ===');
    console.log('📦 User data received:', userData);
    console.log('🆔 User _id:', userData?._id);
    console.log('📧 User email:', userData?.email);
    
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Verify what was stored
    const stored = localStorage.getItem("user");
    const parsed = stored ? JSON.parse(stored) : null;
    console.log('💾 Stored in localStorage:', parsed);
    console.log('✅ User login complete');
    console.log('👤 === END LOGIN ===');
  };

  // Logout user
  const logoutUser = () => {
    console.log('👋 === USERSTORE: LOGOUT USER ===');
    console.log('📝 Logging out user:', user.value?.email);
    
    user.value = null;
    localStorage.removeItem("user");
    
    console.log('✅ User logged out, localStorage cleared');
    console.log('👤 === END LOGOUT ===');
  };

  // Load user from localStorage on page reload
  const loadUser = () => {
    console.log('📂 === USERSTORE: LOADING USER ===');
    const stored = localStorage.getItem("user");
    console.log('📦 Raw localStorage data:', stored);
    
    if (stored) {
      try {
        user.value = JSON.parse(stored);
        console.log('✅ User loaded from localStorage:', user.value);
        console.log('🆔 Loaded user _id:', user.value?._id);
        console.log('📧 Loaded user email:', user.value?.email);
      } catch (e) {
        console.error('❌ Error parsing user from localStorage:', e);
        user.value = null;
      }
    } else {
      console.log('📭 No user found in localStorage');
      user.value = null;
    }
    console.log('👤 === END LOAD ===');
  };

  return { user, isLoggedIn, loginUser, logoutUser, loadUser };
});