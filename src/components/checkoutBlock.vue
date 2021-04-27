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

    <historyBlock v-bind:ignore-newest="true"></historyBlock>
  </div>

</template>
<script lang="ts">
/* eslint-disable no-alert, no-console */
import historyBlock from './historyBlock.vue';

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

@Component({
  components: {
    historyBlock,
  },
})
export default class checkoutBlock extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allOrders: any[] = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";
  $router: any;

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
