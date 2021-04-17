<template>
  <div id="selectionBlock">
    <section style="grid-area:filterBlock" class="column">
      <button class="filterButton" v-on:click="toggleApps">
        Toggle Appetizers
      </button>
      <button class="filterButton" v-on:click="toggleEnts">
        Toggle Entrees
      </button>
      <button class="filterButton" v-on:click="toggleDes">
        Toggle Desserts
      </button>
      <button class="filterButton" v-on:click="toggleSids">Toggle Sides</button>
    </section>
    <section
      style="grid-area:displayBlock;background-color:lightblue;"
      class="column"
    >
      <h3 class="appFilter">Appetizers</h3>
      <table>
        <tr v-for="(z, pos) in allApps" :key="pos" class="appFilter">
          <td style="width:160px" class="appFilter">{{ z.name }}</td>
          <td style="max-width:350px" class="appFilter">{{ z.description }}</td>
          <td style="width:57px" class="appFilter">${{ z.price }}</td>
          <td class="appFilter">
            <button v-on:click="addToCart(z.name, z.price)">
              add to order
            </button>
          </td>
        </tr>
      </table>

      <h3 class="entFilter">Entrees</h3>
      <table>
        <tr v-for="(z, pos) in allEntrees" :key="pos" class="entFilter">
          <td style="width:160px" class="entFilter">{{ z.name }}</td>
          <td style="max-width:350px" class="entFilter">{{ z.description }}</td>
          <td style="width:57px" class="entFilter">${{ z.price }}</td>
          <td class="entFilter">
            <button v-on:click="addToCart(z.name, z.price)">
              add to order
            </button>
          </td>
        </tr>
      </table>

      <h3 class="desFilter">Desserts</h3>
      <table>
        <tr v-for="(z, pos) in allDesserts" :key="pos" class="desFilter">
          <td style="width:160px" class="desFilter">{{ z.name }}</td>
          <td style="max-width:350px" class="desFilter">{{ z.description }}</td>
          <td style="width:57px" class="desFilter">${{ z.price }}</td>
          <td class="desFilter">
            <button v-on:click="addToCart(z.name, z.price)">
              add to order
            </button>
          </td>
        </tr>
      </table>

      <h3 class="sidFilter">Sides</h3>
      <table>
        <tr v-for="(z, pos) in allSides" :key="pos" class="sidFilter">
          <td style="width:160px" class="sidFilter">{{ z.name }}</td>
          <td style="max-width:350px" class="sidFilter">{{ z.description }}</td>
          <td style="width:57px" class="sidFilter">${{ z.price }}</td>
          <td class="sidFilter">
            <button v-on:click="addToCart(z.name, z.price)">
              add to order
            </button>
          </td>
        </tr>
      </table>
    </section>
    <section style="grid-area:cartBlock" class="column">
      <h3>Cart</h3>
      <table style="padding-left:160px">
        <tr v-for="(c, pos) in allSelections" :key="pos">
          <td>{{ c.name }}</td>
          <td>{{ c.price }}</td>
        </tr>
      </table>

      <div style="border-style:solid">
        <div style="border-bottom-style:solid">Running Total: ${{ runningTotal }}</div>
        <div  style="border-bottom-style:solid">Sales Tax: ${{ (runningTotal * 0.06).toFixed(2) }}</div>
        <div  style="border-bottom-style:solid">Grand Total: ${{ (runningTotal * 1.06).toFixed(2) }}</div>
      </div>
      <router-link to="/checkout" @click.native="addOrder" replace>Checkout</router-link>
    </section>
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
import $ from "jquery";
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
  private runningTotal = 0;
  private allSides: any[] = [];
  private itemsArr: string[] = [];
  private pricesArr: number[] = []
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";

  toggleApps() {
    $(".appFilter").toggle();
  }
  toggleEnts() {
    $(".entFilter").toggle();
  }
  toggleSids() {
    $(".sidFilter").toggle();
  }
  toggleDes() {
    $(".desFilter").toggle();
  }

  addOrder(): void {
    console.log("reached add order");
    for(let i = 0;i<this.allSelections.length;i++){
      this.itemsArr[i] = this.allSelections[i].name;
      this.pricesArr[i] = this.allSelections[i].price;
    }
    console.log("user id: "+this.uid);
    
    this.$appDB
    .collection(`restaurant/orders/${this.uid}`)
    .add({
      items: this.itemsArr,
      prices: this.pricesArr,
      total: this.runningTotal,
      grand_total: this.runningTotal * 1.06
    });
  }

  addToCart(name: string, price: number) {
    this.allSelections.push({
      name: name,
      price: price,
    });
    this.runningTotal += price;
  }

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    console.log(this.uid);
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
  }
}
</script>

<style scoped>
td,
tr {
  border-style: solid;
}

table {
}

.column {
  float: left;
  width: 33%;
  padding: 10px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.filterButton {
  width: 300px;
  height: 40px;
  margin-top: 20px;
  font-family: emoji;
}

.appFilter {
  background-color: lightgoldenrodyellow;
  font-family: emoji;
}

.entFilter {
  background-color: tan;
  font-family: emoji;
}

.desFilter {
  background-color: pink;
  font-family: emoji;
}

.sidFilter {
  background-color: lightgray;
  font-family: emoji;
}
</style>
