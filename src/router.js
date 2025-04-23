import { createRouter, createWebHistory } from "vue-router";
import Signup from "./pages/signup.vue";
import Login from "./pages/login.vue";
import Sidebar from "./components/Sidebar.vue";

const routes = [
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Sidebar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
