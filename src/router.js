import { createRouter, createWebHistory } from "vue-router";
import Signup from "./pages/signup.vue";
import Login from "./pages/login.vue";
import Home from "./pages/Home.vue";
import SideBar from "./components/SideBar.vue";

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
    component: SideBar,
    children: [
      { path: "/", component: Home },
      { path: "/product-management", component: Home },
      { path: "/order-management", component: Home },
      { path: "/customer-management", component: Home },
      { path: "/store-configuration", component: Home },
      { path: "/translation-management", component: Home },
      { path: "/currency-management", component: Home },
    ],
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
