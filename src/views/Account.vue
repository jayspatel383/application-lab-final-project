<template>
  <div class="account-page">
    <h1>My Account</h1>
    
    <div v-if="user" class="account-info">
      <p>Welcome back, <strong>{{ user.email }}</strong>!</p>
      <p>You are successfully logged in.</p>
      
      <div class="account-actions">
        <button @click="goToHome" class="btn">Continue Shopping</button>
        <button @click="handleLogout" class="btn logout">Logout</button>
      </div>
    </div>
    
    <div v-else>
      <p>Loading account information...</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(() => {
  // If no user is found, redirect to login
  if (!user.value) {
    router.push('/login');
  }
});

const goToHome = () => {
  router.push('/');
};

const handleLogout = () => {
  userStore.logoutUser();
  router.push('/login');
};
</script>

<style scoped>
.account-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.account-page h1 {
  color: #333;
  margin-bottom: 20px;
}

.account-info {
  margin: 30px 0;
}

.account-info p {
  font-size: 18px;
  margin: 10px 0;
  color: #555;
}

.account-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.logout {
  background: #e74c3c;
}

.logout:hover {
  background: #c0392b;
}
</style>