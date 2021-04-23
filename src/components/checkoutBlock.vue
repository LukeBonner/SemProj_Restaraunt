<template>
  <div id="checkoutBlock">
    <h2>Thank you for your Order!</h2>
    <div id="currentOrder" v-if="allOrders[0]">
      <div>
        Items:
        <div>{{ arrToStr(allOrders[0].items) }}</div>
      </div>
      <div>
        Item Prices:
        <div>{{ arrToStr(allOrders[0].prices) }}</div>
      </div>
      <div>
        order total: ${{ allOrders[0].total.toFixed(2) }}
      </div>
      <div>
        order total inc. tax: ${{ allOrders[0].grand_total.toFixed(2) }}
      </div>
    </div>

    <h2 v-if="allOrders.length>1">Previous Orders</h2>
    <table v-if="allOrders.length>1" style="
      margin-left:auto;
      margin-right:auto;
      background-color:rgb(230, 230, 230);
      border-style:solid;
      border-width:6px;
      border-collapse:collapse;"
    >
      <tr>
        <th>Time</th>
        <th>Items</th>
        <th>Prices</th>
        <th>Total</th>
        <th>Grand Total</th>
      </tr>

      <tr v-for="(c, pos) in allOrders.slice(1)" :key="pos">
        <td>{{c.time.slice(0,10) + " at " + c.time.slice(12, 19)}}</td>
        <td>{{ arrToStr(c.items) }}</td>
        <td>{{ arrToStr(c.prices) }}</td>
        <td>{{ c.total.toFixed(2) }}</td>
        <td>{{ c.grand_total.toFixed(2) }}</td>
      </tr>
    </table>
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
// eslint-disable-next-line

@Component({})
export default class checkoutBlock extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allOrders: any[] = [];
  spendingDate: any;
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";
  $router: any;

  arrToStr(xs : any[]) : string{
    return xs.map((x: any) => String(x)).join(", ");
  }

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    if(this.uid === "none"){
      this.$router.back();
    }

    this.$appDB
      .collection(`restaurant/orders/${this.uid}`)
      .orderBy("time", "desc") //newest comes first
      .onSnapshot((qs: QuerySnapshot) => {
        this.allOrders.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            if(catData === undefined) console.log("Bad 1");
            this.allOrders.push({
              time: catData.time,
              items: catData.items,
              prices: catData.prices,
              total: catData.total,
              grand_total: catData.grand_total,
            });
          }
        });
      });

    console.log(this.allOrders);
  }
}
</script>

<style scoped>
th, td {
  border-style: solid;
  border-collapse:collapse;
  padding: 0.15em 0.5em 0.15em 0.5em;
}

tr{
  border-style: solid;
  border-collapse:collapse;
}

#currentOrder {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  background-color:rgb(177, 208, 255);
  border:8px solid rgb(177, 208, 255);
  font-size: 115%;
  border-radius:8px;
}
#currentOrder > div:first-child{
  border-bottom-style:solid; 
  padding:0 0 0.3em 0;
}
#currentOrder > div:not(:first-child):not(:last-child) {
  border-bottom-style:solid; 
  padding: 0.3em 0 0.3em 0;
}
#currentOrder > div:last-child {
  border-style:none;
  padding: 0.3em 0 0 0;
}
</style>
