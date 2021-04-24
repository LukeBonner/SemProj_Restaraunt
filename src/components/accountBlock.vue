<template>
  <div>
    <div><button v-on:click="gotoSelection" style="color:white;background-color:#ff2505">
      Start a New Order
    </button></div>
    <div><button v-on:click="gotoHistory" style="color: #2c3e50;">
      View Order History
    </button></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

  @Component
  export default class myExpense extends Vue{
    readonly $appAuth!: FirebaseAuth;
    $router: any;

    gotoSelection(): void {
      this.$router.replace({ path: "/selection" });
    }

    gotoHistory(): void {
      this.$router.replace({ path: "/history" });
    }

    mounted(): void {
      if(! this.$appAuth.currentUser){
        this.$router.replace({ path: "/" });
      }
    }
  }
</script>

<style scoped>
  button {
    width: 300px;
    height: 60px;
    margin-top: 20px;
    font-size: 120%;
    border-radius: 5px;
    border: none;
    box-shadow: 6px 6px 15px black;
  }
</style>