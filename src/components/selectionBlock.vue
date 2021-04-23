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
      style="grid-area:displayBlock;background-color:lightblue;border-radius:5px;"
      class="column"
    >
      <h3 class="appFilter category">Appetizers</h3>
      <table>
        <tr v-for="(z, pos) in allApps" :key="pos" class="appFilter menu">
          <td>{{ z.name }}</td>
          <td>{{ z.description }}</td>
          <td>${{ z.price }}</td>
          <td class="appFilter">
            <button v-on:click="addToCart(z.name, z.price)">
              add to order
            </button>
          </td>
        </tr>
      </table>

      <h3 class="entFilter category">Entrees</h3>
      <table>
        <tr v-for="(z, pos) in allEntrees" :key="pos" class="entFilter menu">
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

      <h3 class="desFilter category">Desserts</h3>
      <table>
        <tr v-for="(z, pos) in allDesserts" :key="pos" class="desFilter menu">
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

      <h3 class="sidFilter category">Sides</h3>
      <table>
        <tr v-for="(z, pos) in allSides" :key="pos" class="sidFilter menu">
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
    <section style="grid-area:cartBlock;" class="column">
      <h2>Cart</h2>
      <table style="min-width:17em; margin: 0 auto 0 auto;">
        <tr v-for="(c, pos) in allSelections" :key="pos">
          <td class="cartItem">{{ c.name }}</td>
          <td class="cartItem">{{ c.price }}</td>
        </tr>
      </table>

      <table style="min-width:21em; margin: 8px auto 0 auto">
        <tr><td class="cartItem">Running Total: ${{ runningTotal.toFixed(2) }}</td></tr>
        <tr><td class="cartItem">Sales Tax: ${{ (runningTotal * 0.06).toFixed(2) }}</td></tr>
        <tr><td class="cartItem">Grand Total: ${{ (runningTotal * 1.06).toFixed(2) }}</td></tr>
      </table>

      <button v-if="this.allSelections.length > 0"
         class=checkout  @click="$router.replace('/checkout')"
      >
      Checkout
      </button>
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
  readonly $appAuth!: FirebaseAuth;

  private allSelections: any[] = [];
  private allApps: any[] = [];
  private allEntrees: any[] = [];
  private allDesserts: any[] = [];
  private runningTotal = 0;
  private allSides: any[] = [];
  private itemsArr: string[] = [];
  private pricesArr: number[] = []
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
      time: (new Date()).toISOString(),
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
    if(this.uid === "none"){
      this.$router.back();
    }


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

#selectionBlock{
  display: grid;
  grid-template-columns: 3fr 4fr 3fr;
  grid-template-areas: "filterBlock displayBlock cartBlock";
}

.column {
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 10px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

button.filterButton {
  width: 300px;
  height: 40px;
  margin-top: 20px;
  font-size: 100%;
  color: #2c3e50;
  border-radius: 5px;
  border: none;
  box-shadow: 6px 6px 15px black;
}

tr.appFilter > td, .appFilter {
  background-color: rgb(247, 247, 150);
}

tr.entFilter > td, .entFilter {
  background-color: tan;
}

tr.desFilter > td, .desFilter {
  background-color: pink;
}

tr.sidFilter > td, .sidFilter {
  background-color: lightgray;
}

tr.menu > td, .category {
  border-style: solid;
  border-radius: 4px;
}

tr.menu > :last-child {
  background-color: lightblue;
  border-style: none;
}

tr.menu > td:nth-child(1){
  width: 160px;
}

.cartItem {
  border: 2px solid;
  border-radius: 4px;
  background-color: rgb(230, 230, 230);
}

.checkout {
  font-size: 120%;
  color: white;
  background-color: rgb(255, 100, 52);
}
</style>