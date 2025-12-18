<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Register</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="Full Name" v-model="name" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <input type="tel" placeholder="Phone Number" v-model="phone" required />
        <input type="text" placeholder="Address" v-model="address" required />

        <button type="submit" :disabled="loading">
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <p class="login-link">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signupAPI } from "../services/authService";
import { useCartStore } from "../stores/cartStore"; // ✅ ADD THIS IMPORT
import { useUserStore } from "../stores/userStore";

const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const address = ref("");
const loading = ref(false);
const error = ref("");

const router = useRouter();
const userStore = useUserStore();
const cartStore = useCartStore(); // ✅ ADD THIS

const handleRegister = async () => {
  loading.value = true;
  error.value = "";

  try {
    console.log("📤 Sending registration request...");
    
    const res = await signupAPI({
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value,
    });

    console.log("📥 Registration response:", res);

    if (res.success) {
      console.log("✅ Registration successful, user:", res.user);
      
      // Update store and persist user
      userStore.loginUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));

      // ✅ Load user's cart (empty for new user)
      cartStore.loadCart();
      console.log("🛒 Cart loaded for new user");

      // Redirect to account/dashboard
      router.push("/account");
    } else {
      error.value = res.message || "Registration failed";
      console.log("❌ Registration failed:", res.message);
    }
  } catch (err) {
    console.error("🔥 Registration error:", err);
    console.error("Error details:", err.message, err.stack);
    error.value = "Server error: " + (err.message || "Please try again");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
}

.register-card {
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.register-card h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.register-card form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.register-card input {
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.register-card input:focus {
  border-color: #f1c40f;
  outline: none;
}

.register-card button {
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  background: #f1c40f;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-card button:hover {
  background: #d4ac0d;
}

.register-card button:disabled {
  background: #f7e08a;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #f1c40f;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>