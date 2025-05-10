import { createRouter, createWebHistory } from "vue-router";
import Signup from "./pages/signup.vue";
import Login from "./pages/login.vue";
import Home from "./pages/Home.vue";
import AddProduct from "./pages/AddProduct.vue";
import SideBar from "./components/SideBar.vue";
import ProductManagement from "./pages/ProductManagement.vue";
import OrderDetails from "./pages/OrderDetails.vue";
import OrderManagement from "./pages/OrderManagement.vue";
import CustomerManagement from "./pages/CustomerManagement.vue";


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
      { path: "", component: Home },
      { path: "product-management", component: ProductManagement },
      { path: "order-management", component: OrderManagement },
      { path: "customer-management", component: CustomerManagement },
      { path: "store-configuration", component: Home },
      { path: "translation-management", component: Home },
      { path: "currency-management", component: OrderDetails },
      { path: "product-management/add-product", component: AddProduct },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
