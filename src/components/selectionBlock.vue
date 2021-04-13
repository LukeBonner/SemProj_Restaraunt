<template>
  <div id="selectionBlock">
    <section style="grid-area:filterBlock"></section>
    <section style="grid-area:displayBlock">
      <h3>Appetizers</h3>
      <table>
        <tr v-for="(z, pos) in allApps" :key="pos">
            <td>{{z.name}}</td>
            <td>{{z.description}}</td>
            <td>{{z.price}}</td>
            <td>{{z.image}}</td>
            <td><button v-on:click=addToCart>add to order</button></td>
        </tr>
      </table>

      <h3>Entrees</h3>
      <table>
        <tr v-for="(z, pos) in allEntrees" :key="pos">
            <td>{{z.name}}</td>
            <td>{{z.description}}</td>
            <td>{{z.price}}</td>
            <td>{{z.image}}</td>
            <td><button v-on:click=addToCart>add to order</button></td>
        </tr>
      </table>

      <h3>Desserts</h3>
      <table>
        <tr v-for="(z, pos) in allDesserts" :key="pos">
            <td>{{z.name}}</td>
            <td>{{z.description}}</td>
            <td>{{z.price}}</td>
            <td>{{z.image}}</td>
            <td><button v-on:click=addToCart>add to order</button></td>
        </tr>
      </table>

      <h3>Sides</h3>
      <table>
        <tr v-for="(z, pos) in allSides" :key="pos">
            <td>{{z.name}}</td>
            <td>{{z.description}}</td>
            <td>{{z.price}}</td>
            <td><button v-on:click=addToCart>add to order</button></td>
        </tr>
      </table>
    </section>
    <section style="grid-area:cartBlock"></section>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-alert, no-console */
import { Component, Vue } from "vue-property-decorator";
import {
  FirebaseFirestore,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "@firebase/firestore-types";
import "firebase/firestore";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import "firebase/firestore";

@Component
export default class BudgetCategory extends Vue {
  readonly $appDB!: FirebaseFirestore;

  private allSelections: any[] = [];
  private allApps: any[] = [];
  private allEntrees: any[] = [];
  private allDesserts: any[] = [];
  private allSides: any[] = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";

  addOrder(): void {
    this.$appDB.collection(``).add({});
  }

  addToCart(){
    console.log("NYI");
  }

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`/restaurant/menu/Appetizers`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allApps.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allApps.push({
              name: catData.name,
              description: catData.description,
              price: catData.price,
              image: catData.image,
            });
          }
        });
      });

    this.$appDB
      .collection(`/restaurant/menu/Entrees`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allEntrees.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allEntrees.push({
              name: catData.name,
              description: catData.description,
              price: catData.price,
              image: catData.image,
            });
          }
        });
      });

    this.$appDB
      .collection(`/restaurant/menu/Sides`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allSides.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allSides.push({
              name: catData.name,
              description: catData.description,
              price: catData.price,
            });
          }
        });
      });

    this.$appDB
      .collection(`/restaurant/menu/Deserts`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allDesserts.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allDesserts.push({
              name: catData.name,
              description: catData.description,
              price: catData.price,
              image: catData.image,
            });
          }
        });
      });


      console.log(this.allApps)
      console.log(this.allEntrees)
      console.log(this.allDesserts)
      console.log(this.allSides)
      
  }
}
</script>

<style scoped></style>
