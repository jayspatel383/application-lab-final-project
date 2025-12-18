import { useUserStore } from "@/stores/userStore";
import { createRouter, createWebHistory } from "vue-router";

// Pages
import AboutView from "../views/AboutView.vue";
import Account from "../views/Account.vue";
import CartPage from "../views/CartPage.vue";
import CheckoutPage from "../views/CheckoutPage.vue";
import Contact from "../views/contact.vue";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import ProductDetailPage from "../views/ProductDetailPage.vue";
import ProductPage from "../views/ProductPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: AboutView },
  { path: "/products", name: "AllProducts", component: ProductPage },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetailPage, props: true },
  { path: "/cart", name: "CartPage", component: CartPage },
  { 
    path: "/checkout", 
    name: "Checkout", 
    component: CheckoutPage, 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/login", 
    name: "LoginPage", 
    component: LoginPage,
    meta: { requiresGuest: true } // ✅ ADD THIS
  },
  { 
    path: "/register", 
    name: "RegisterPage", 
    component: RegisterPage,
    meta: { requiresGuest: true } // ✅ ADD THIS
  },
  { path: "/contact", name: "Contact", component: Contact },
  { 
    path: "/account", 
    name: "Account", 
    component: Account, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ UPDATED Navigation guard (FIXED VERSION)
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.loadUser(); // Load user from localStorage
  
  const isLoggedIn = userStore.isLoggedIn;

  // If route requires auth AND user is NOT logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login?redirect=" + to.fullPath);
  } 
  // ✅ ADD THIS: If route is for guests ONLY AND user IS logged in
  else if (to.meta.requiresGuest && isLoggedIn) {
    // Redirect logged-in users away from login/register pages
    next("/account");
  }
  // Otherwise, proceed
  else {
    next();
  }
});

export default router;