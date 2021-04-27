<template>
  <div>
    <button v-on:click="selectedCategory=appetizers; itemIndex=null">Appetizers</button>
    <button v-on:click="selectedCategory=entrees; itemIndex=null">Entrees</button>
    <button v-on:click="selectedCategory=desserts; itemIndex=null">Desserts</button>
    <button v-on:click="selectedCategory=sides; itemIndex=null">Sides</button>

    <div v-if="selectedCategory !== null">
      <button v-on:click="addItem">Add Item</button>
      <table style="background-color:rgb(230, 230, 230);">
        <tr  
          v-for="(item, pos) in selectedCategory.items" 
          v-bind:class="{active: itemIndex !== null && itemIndex === pos}" 
          :key="pos"
        >
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.price}}</td>
          <td><button v-on:click="itemIndex = pos">Select Item</button></td>
          <td><button v-on:click="deleteItem(pos)">Delete Item</button></td>
        </tr>
      </table>
    </div>

    <div v-if="selectedCategory !== null">
        <h3>Name:</h3> <input v-model="itemName" type="text"> 
          <button v-on:click="updateName">Update Name</button>
        <h3>Price:</h3> <input  v-model="itemPrice" type="text"> 
          <button v-on:click="updatePrice">Update Price</button>
        <h3>Description:</h3> <textarea v-model="itemDescr" rows="8" cols="40"></textarea>
          <button v-on:click="updateDescr">Update Descripion</button>
    </div>
    
  </div>


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  FirebaseFirestore,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "@firebase/firestore-types";
import "firebase/firestore";

import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

type menuItem = 
{
  id: string,
  name: string,
  description: string,
  price: number
}

type menuCategory =
{
  path: string,
  items: menuItem[]
}

@Component
export default class editMenu extends Vue{
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  selectedCategory: menuCategory | null = null;
  itemIndex: number | null = null;

  appetizers: menuCategory = {path:`/restaurant/menu/Appetizers`, items:[]};
  entrees: menuCategory = {path:`/restaurant/menu/Entrees`, items:[]};
  sides: menuCategory = {path:`/restaurant/menu/Sides`, items:[]};
  desserts: menuCategory = {path:`/restaurant/menu/Deserts`, items:[]};

  itemName: string = "";
  itemPrice: string = "";
  itemDescr: string = "";

  addItem(): void{
    if(this.selectedCategory !== null){
      const newItem : any = 
      {
        name: this.itemName,
        description: this.itemDescr,
        price: parseFloat(this.itemPrice),
      };
      this.$appDB.collection(this.selectedCategory.path).doc(this.itemName).set(newItem);
      this.itemIndex = null;
    }
  }

  deleteItem(pos: number): void{
    if(this.selectedCategory !== null){
      const id: string = this.selectedCategory.items[pos].id;
      this.$appDB.collection(this.selectedCategory.path).doc(id).delete();
      this.itemIndex = null;
    }
  }

  updateName(): void{
    if(this.selectedCategory !== null && this.itemIndex !== null){
      const id: string = this.selectedCategory.items[this.itemIndex].id;
      this.$appDB.collection(this.selectedCategory.path).doc(id)
        .update({name: this.itemName});
    }
  }

  updatePrice(): void{
    if(this.selectedCategory !== null && this.itemIndex !== null){
      const id: string = this.selectedCategory.items[this.itemIndex].id;
      this.$appDB.collection(this.selectedCategory.path).doc(id)
        .update({price: parseFloat(this.itemPrice)})
    }
  }
  updateDescr(): void{
    if(this.selectedCategory !== null && this.itemIndex !== null){
      const id: string = this.selectedCategory.items[this.itemIndex].id;
      this.$appDB.collection(this.selectedCategory.path).doc(id)
        .update({description: this.itemDescr})
    }
  }


  bindCollection(path: string, local: menuCategory) {
      this.$appDB
      .collection(path)
      .orderBy("name") 
      .onSnapshot((qs: QuerySnapshot) => {
        local.items.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const data = qds.data();
            local.items.push({
              id: qds.id,
              name: data.name,
              description: data.description,
              price: data.price
            });
          }
        });
      });
  }

  mounted(): void{
    if(! this.$appAuth.currentUser){
      this.$router.replace({ path: "/" });
    }

    this.bindCollection(`/restaurant/menu/Appetizers`, this.appetizers);
    this.bindCollection(`/restaurant/menu/Entrees`, this.entrees);
    this.bindCollection(`/restaurant/menu/Sides`, this.sides);
    this.bindCollection(`/restaurant/menu/Deserts`, this.desserts);
    
  }

}

</script>

<style scoped>
button {
  margin-left: 15px;
}

.active{
  background-color: rgb(255, 136, 0);
}
</style>