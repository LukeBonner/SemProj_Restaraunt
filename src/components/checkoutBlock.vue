<template>
  <div id="checkoutBlock" >
    
  </div>
</template>
<script lang="ts">
/* eslint-disable no-alert, no-console */
import { Component, Vue } from 'vue-property-decorator';
import {FirebaseFirestore, QuerySnapshot, QueryDocumentSnapshot} from "@firebase/firestore-types"
import "firebase/firestore";

import { FirebaseAuth,UserCredential } from "@firebase/auth-types";
import "firebase/firestore"
// eslint-disable-next-line


@Component({})
export default class myExpense extends Vue{
    readonly $appDB!: FirebaseFirestore;
    private allOrders: any[] = [];
    spendingDate: any;
    readonly $appAuth!: FirebaseAuth;
    private uid = "none"

    
 
    
    mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    

    this.$appDB
    .collection(``)
    .orderBy("")       // Sort by category name
    .onSnapshot((qs: QuerySnapshot) => {
      this.allOrders.splice(0);  // remove old data
      qs.forEach((qds: QueryDocumentSnapshot) => {
        if (qds.exists){
          const catData = qds.data();
          this.allOrders.push({
            
          });
        }
      });
    


    });

    }
    

    


}

</script>

<style scoped>

</style>