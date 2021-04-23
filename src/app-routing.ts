import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import loginBlock from "./components/loginBlock.vue";
import selectionBlock from "./components/selectionBlock.vue";
import checkoutBlock from "./components/checkoutBlock.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: loginBlock,
  },
  {
    name: "Selection",
    path: "/selection",
    component: selectionBlock,
  },
  {
    name: "Checkout",
    path: "/checkout",
    component: checkoutBlock,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
}); 