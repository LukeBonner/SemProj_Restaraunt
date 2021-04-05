<template>
  <div id="selectionBlock">
      
  </div>
</template>

<script lang="ts">
/* eslint-disable no-alert, no-console */
import { Component, Vue } from 'vue-property-decorator';
import {FirebaseFirestore, QuerySnapshot, QueryDocumentSnapshot} from "@firebase/firestore-types"
import "firebase/firestore";
import { FirebaseAuth,UserCredential } from "@firebase/auth-types";
import "firebase/firestore"

@Component
export default class BudgetCategory extends Vue{
    readonly $appDB!: FirebaseFirestore;

    private allSelections: any[] = [];
    readonly $appAuth!: FirebaseAuth;
    private uid = "none"


     addOrder(): void {
    this.$appDB
    .collection(``)
    .add({      
      
    })}

    mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
    .collection(``)
    .orderBy("")       // Sort by category name
    .onSnapshot((qs: QuerySnapshot) => {
      this..splice(0);  // remove old data
      qs.forEach((qds: QueryDocumentSnapshot) => {
        
      });
    });
}
}


</script>


<style scoped>
</style>