<template>
  <div>
    <div><button v-on:click="gotoSelection" style="color:white;background-color:#ff2505">
      Start a New Order
    </button></div>
    <div><button v-on:click="gotoHistory" style="color: #2c3e50;">
      View Order History
    </button></div>
    <div><button v-if="canEdit" v-on:click="gotoEditMenu" style="color: #2c3e50;">
      Edit Menu
    </button></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

  import {FirebaseFirestore, QuerySnapshot, FirestoreError} from "@firebase/firestore-types";
  import $ from "jquery";

  @Component
  export default class account extends Vue{
    readonly $appAuth!: FirebaseAuth;
    readonly $appDB!: FirebaseFirestore;
    $router: any;

    canEdit : boolean = false;

    gotoSelection(): void {
      this.$router.replace({ path: "/selection" });
    }

    gotoHistory(): void {
      this.$router.replace({ path: "/history" });
    }

    gotoEditMenu(): void {
      this.$router.replace({ path: "/edit-menu" });
    }

    mounted(): void {
      if(! this.$appAuth.currentUser){
        this.$router.replace({ path: "/" });
      }

      this.$appDB
      .collection(`/dummy`).onSnapshot(
        (q:QuerySnapshot) =>{this.canEdit = true;},
         (e:FirestoreError) =>{this.canEdit = false;}
      );
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