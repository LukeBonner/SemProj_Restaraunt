import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
require('firebase/auth')
import "firebase/firestore";
import VueApexCharts from "vue-apexcharts";
import { AppRouter } from "./app-routing";
Vue.use(VueApexCharts);

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyD4HD4YZpzCXAC8yBx0FBvjrwNORDSJuak",
  authDomain: "semproj-restaraunt.firebaseapp.com",
  projectId: "semproj-restaraunt",
  storageBucket: "semproj-restaraunt.appspot.com",
  messagingSenderId: "319410516594",
  appId: "1:319410516594:web:6367dd0832ba2af57988eb",
  measurementId: "G-BQBQWL6WQ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();

new Vue({
  router: AppRouter, 
  render: h => h(App),
}).$mount('#app')
