import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import { useUserStore } from "./stores/userStore"; // import the store

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Load persisted user on app start
const userStore = useUserStore();
userStore.loadUser();

app.mount("#app");
