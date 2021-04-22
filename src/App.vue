<template>
  <div id="app" >
    <h1 style="color:white; text-shadow: 0 0 3px black; font-weight: normal;">Restaurant and stuff</h1>

    <button v-if="userLoggedIn()" v-on:click="doLogout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import selectionBlock from './components/selectionBlock.vue';
import checkoutBlock from './components/checkoutBlock.vue';
import loginBlock from './components/loginBlock.vue';
import {FirebaseFirestore} from "@firebase/firestore-types"
import "firebase/firestore";
import "firebase/auth";

import { FirebaseAuth,UserCredential } from "@firebase/auth-types";
@Component({
  components: {
    selectionBlock,
    checkoutBlock,
    loginBlock

  },
})
export default class App extends Vue {
    readonly $appDB!: FirebaseFirestore;
    readonly $appAuth!: FirebaseAuth;
    $router: any;

  userLoggedIn(): boolean {
  return this.$appAuth.currentUser?.uid !== undefined;
  }

  doLogout(): void {
  this.$appAuth.signOut();
  this.$router.back();    // Go backward in the "history stack"
  }

  // This function is automatically called when
  // the App component is added to the DOM tree
  mounted(): void {
    // Just for debugging, you may delete the following two
    // lines after it is confirmed that this.$appDB is
    // initialized correctly
    console.log("initialized");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-image: url("~@/assets/image.jpg");
  background-size: 100%;
  background-attachment: fixed;
}
</style>
