import { createRouter, createWebHistory } from "vue-router";
import Signup from "./pages/signup.vue";
import Login from "./pages/login.vue";
import Home from "./pages/Home.vue";
import AddProduct from "./pages/AddProduct.vue";
import SideBar from "./components/SideBar.vue";
import ProductManagement from "./pages/ProductManagement.vue";

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
      { path: "/product-management", component: ProductManagement , children: [
        { path: "/add-product", component: AddProduct },
      ]},
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
