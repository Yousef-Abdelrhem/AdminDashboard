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

// const sideBarItems = [
//   { name: "Home Page", path: "/", icon: "home-icon.svg" },
//   {
//     name: "Product Management",
//     path: "/product-management",
//   },
//   {
//     name: "Order Management",
//     path: "/order-management",
//   },
//   {
//     name: "Customer Management",
//     path: "/customer-management",
//   },
//   {
//     name: "Store Configuration",
//     path: "/store-configuration",
//   },
//   {
//     name: "Translation Management",
//     path: "/translation-management",
//   },
//   {
//     name: "Currency Management",
//     path: "/currency-management",
//   },
// ];
