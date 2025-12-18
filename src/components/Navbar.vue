<template>
  <nav class="navbar">
    <!-- Brand -->
    <div class="navbar-left">
      <router-link to="/" class="brand">MyWatch</router-link>
    </div>

    <!-- Hamburger (mobile only) -->
    <div class="hamburger" @click="toggleMenu">
      <span :class="{ 'active': menuOpen }"></span>
      <span :class="{ 'active': menuOpen }"></span>
      <span :class="{ 'active': menuOpen }"></span>
    </div>

    <!-- Links -->
    <div class="navbar-center" :class="{ 'open': menuOpen }">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>

      <!-- Mobile-only: Cart & User inside menu -->
      <div class="mobile-icons">
        <router-link to="/cart" class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2zm10-2c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm0 2zM7.82 14h8.36c.75 0 1.41-.41 1.75-1.03l3.58-6.49a.996.996 0 0 0-.87-1.48H5.21L4.27 2H0v2h2l3.6 7.59-1.35 2.44C4.52 14.37 5.48 16 7 16h12v-2H7.82z"/>
          </svg>
        </router-link>
        <router-link to="/login" class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Desktop-only: Cart & User -->
    <div class="navbar-right desktop-only">
      <router-link to="/cart" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2zm10-2c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm0 2zM7.82 14h8.36c.75 0 1.41-.41 1.75-1.03l3.58-6.49a.996.996 0 0 0-.87-1.48H5.21L4.27 2H0v2h2l3.6 7.59-1.35 2.44C4.52 14.37 5.48 16 7 16h12v-2H7.82z"/>
        </svg>
      </router-link>
      <router-link to="/login" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
        </svg>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const menuOpen = ref(false);
const toggleMenu = () => menuOpen.value = !menuOpen.value;
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 35px;
  background: white;
  color: #333;
  position: sticky; /* make it sticky */
  top: 0;           /* stick to top */
  left: 0;
  right: 0;
  z-index: 1000;    /* high z-index to stay above content */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-family: 'Poppins', sans-serif;
  height: 80px;
}

/* ACTIVE NAV LINK */
.navbar-center a.router-link-exact-active {
  color: #1e90ff;
  font-weight: 700;
  transform: scale(1.05);
}

/* underline stays visible for active page */
.navbar-center a.router-link-exact-active::after {
  width: 100%;
}

.brand {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #ff6b6b, #f6d365, #1e90ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
  background-clip: 50;
}

.brand:hover {
  transform: scale(1.05);
}

.navbar-center { display: flex; gap: 30px; align-items: center; transition: max-height 0.4s ease, opacity 0.4s ease; }
.navbar-center a { text-decoration: none; font-weight: 600; font-size: 16px; color: #555; position: relative; padding: 8px 0; transition: color 0.3s ease, transform 0.2s ease; }
.navbar-center a:hover { color: #1e90ff; transform: scale(1.05); }
.navbar-center a::after { content: ''; display: block; height: 3px; background: #1e90ff; width: 0%; transition: width 0.3s; position: absolute; bottom: -5px; left: 0; border-radius: 2px; }
.navbar-center a:hover::after { width: 100%; }

.navbar-right { display: flex; gap: 25px; font-size: 22px; align-items: center; }
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e90ff;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.icon:hover { background: #ff6b6b; transform: scale(1.1); }
.icon svg { width: 22px; height: 22px; fill: white; }

.desktop-only { display: flex; }

.hamburger { display: none; flex-direction: column; cursor: pointer; gap: 6px; z-index: 15; }
.hamburger span { display: block; width: 30px; height: 3px; background: #333; border-radius: 2px; transition: all 0.4s ease; }
.hamburger span.active:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger span.active:nth-child(2) { opacity: 0; }
.hamburger span.active:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-icons { display: none; flex-direction: column; margin-top: 15px; }
.mobile-icons .icon { margin: 8px auto; }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .navbar-center { position: absolute; top: 80px; left: 0; right: 0; flex-direction: column; background: white; text-align: center; padding: 0; max-height: 0; overflow: hidden; opacity: 0; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
  .navbar-center.open { max-height: 500px; padding: 20px 0; opacity: 1; }
  .desktop-only { display: none; }
  .mobile-icons { display: flex; }
}
</style>
