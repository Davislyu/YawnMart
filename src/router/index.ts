import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import HomeView from "./../views/HomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth/login",
      name: "auth-login",
      component: Login,
    },
  ],
});

export default router;
