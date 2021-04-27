import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import loginBlock from "./components/loginBlock.vue";
import selectionBlock from "./components/selectionBlock.vue";
import checkoutBlock from "./components/checkoutBlock.vue";
import accountBlock from "./components/accountBlock.vue";
import historyBlock from "./components/historyBlock.vue";
import editMenuBlock from "./components/editMenuBlock.vue";

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
  {
    name: "Account",
    path: "/account",
    component: accountBlock,
  },
  {
    name: "History",
    path: "/history",
    component: historyBlock,
  },
  {
    name: "EditMenu",
    path: "/edit-menu",
    component: editMenuBlock,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
}); 