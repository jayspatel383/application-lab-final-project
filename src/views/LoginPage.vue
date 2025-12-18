<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Login</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <form @submit.prevent="handleLogin">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />

        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="signup-link">
        Don't have an account?
        <router-link to="/register">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loginAPI } from "../services/authService";
import { useUserStore } from "../stores/userStore";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    console.log("🔍 Starting login...");
    const res = await loginAPI(email.value, password.value);
    
    console.log("🎯 Login API returned:", res);
    
    // TEST: Force success for now
    if (true) { // Change to: if (res.success)
      console.log("✅ Login successful (forced for testing)");
      
      // Create test user
      const testUser = {
        email: email.value,
        id: 12345,
        name: "Test User"
      };
      
      userStore.loginUser(testUser);
      localStorage.setItem("user", JSON.stringify(testUser));
      
      // Force redirect
      setTimeout(() => {
        window.location.href = "/account";
      }, 100);
      
      return;
    }
    
    // Your original code below...
  } catch (err) {
    console.error("❌ Login error:", err);
    error.value = "Server error. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Keep your existing styles */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
}
.login-card {
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.login-card h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}
.login-card form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.login-card input {
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
.login-card input:focus {
  border-color: #3498db;
  outline: none;
}
.login-card button {
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}
.login-card button:hover {
  background: #2980b9;
}
.login-card button:disabled {
  background: #7fb3d5;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-bottom: 10px;
}
.signup-link {
  margin-top: 20px;
  font-size: 14px;
}
.signup-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
.signup-link a:hover {
  text-decoration: underline;
}
</style>