<template>
  <div id="checkoutBlock">
    <h3>Thank you for your Order!</h3>
    <div style="border-style:solid;">
      <div style="border-bottom-style:solid;">
        Items:
        <div>{{ allOrders[0].items }}</div>
      </div>
      <div style="border-bottom-style:solid;">
        Item Prices:
        <div>{{ allOrders[0].prices }}</div>
      </div>
      <div style="border-bottom-style:solid;">
        order total: ${{ allOrders[0].total.toFixed(2) }}
      </div>
      <div style="border-bottom-style:solid;">
        order total inc. tax: ${{ allOrders[0].grand_total.toFixed(2) }}
      </div>
    </div>

    <h3>All Orders</h3>
    <table style="padding-left:100px;">
      <tr v-for="(c, pos) in allOrders" :key="pos">
        <td>{{ c.items }}</td>
        <td>{{ c.prices }}</td>
        <td>{{ c.total }}</td>
        <td>{{ c.grand_total }}</td>
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
  private currentOrderArrs: any[] = [];
  private currentTotal = 0;
  private currentGrandTotal = 0;
  spendingDate: any;
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";

    this.$appDB
      .collection(`restaurant/orders/${this.uid}`)
      .onSnapshot((qs: QuerySnapshot) => {
        this.allOrders.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allOrders.push({
              items: catData.items,
              prices: catData.prices,
              total: catData.total,
              grand_total: catData.grand_total,
            });
          }
        });
      });

    this.currentOrderArrs.push({
      items: this.allOrders[0].items,
      prices: this.allOrders[0].prices,
    });

    this.currentTotal = this.allOrders[0].total;
    this.currentGrandTotal = this.allOrders[0].grand_total;
    console.log(this.currentOrderArrs);

    console.log(this.allOrders);
  }
}
</script>

<style scoped>
td,
tr {
  border-style: solid;
}
</style>
