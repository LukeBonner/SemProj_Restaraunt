<template>
  <div id="checkoutBlock">

    <h2 v-if="ignoreNewest && allOrders.length>1">Previous Orders</h2>
    <h2 v-if="!ignoreNewest">Order History</h2>

    <table v-if="ignoreNewest ? (allOrders.length>1) : (allOrders.length>0)" style="
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

      <tr v-for="(c, pos) in allOrders.slice(ignoreNewest ? 1 : 0)" :key="pos">
        <td>{{ localTime(c.time) }}</td>
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
import { Component, Prop, Vue } from "vue-property-decorator";
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
export default class historyBlock extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allOrders: any[] = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";
  $router: any;

  @Prop({default: false}) private ignoreNewest!: boolean;

  localTime(t : string) : string{
    const d : Date = new Date(t);
    return d.toString().slice(4, 24);
  }

  arrToStr(xs : any[]) : string{
    return xs.map((x: any) => String(x)).join(", ");
  }

  mounted(): void {
    if(! this.$appAuth.currentUser){
      this.$router.replace({ path: "/" });
      return;
    }

    this.$appDB
      .collection(`restaurant/orders/${this.$appAuth.currentUser.uid}`)
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
</style>
