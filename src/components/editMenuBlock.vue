<template>
  <div>
    <button 
      v-bind:class="{ active: selectedCategory!==null && selectedCategory.path === `/restaurant/menu/Appetizers` }"
      v-on:click="selectedCategory=appetizers; selectedItem=null"
    >
      Appetizers
    </button>
    <button 
      v-bind:class="{ active: selectedCategory!==null && selectedCategory.path === `/restaurant/menu/Entrees` }"
      v-on:click="selectedCategory=entrees; selectedItem=null"
    >
      Entrees
      </button>
    <button 
      v-bind:class="{ active: selectedCategory!==null && selectedCategory.path === `/restaurant/menu/Deserts` }"
      v-on:click="selectedCategory=desserts; selectedItem=null"
    >
      Desserts
    </button>
    <button 
      v-bind:class="{ active: selectedCategory!==null && selectedCategory.path === `/restaurant/menu/Sides` }"
      v-on:click="selectedCategory=sides; selectedItem=null"
    >
      Sides
    </button>

    <div v-if="selectedCategory !== null">
      <button v-on:click="addItem">Add Item</button>
      <table style="background-color:rgb(230, 230, 230);">
        <tr  
          v-for="(item, pos) in selectedCategory.items" 
          v-bind:class="{active: selectedItem !== null && selectedItem.id === item.id}" 
          :key="pos"
        >
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.price}}</td>
          <td><button v-on:click="selectedItem = item">Select Item</button></td>
          <td><button v-on:click="deleteItem(item)">Delete Item</button></td>
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
  selectedItem: menuItem | null = null;

  appetizers: menuCategory = {path:`/restaurant/menu/Appetizers`, items:[]};
  entrees: menuCategory = {path:`/restaurant/menu/Entrees`, items:[]};
  sides: menuCategory = {path:`/restaurant/menu/Sides`, items:[]};
  desserts: menuCategory = {path:`/restaurant/menu/Deserts`, items:[]};

  itemName: string = "";
  itemPrice: string = "";
  itemDescr: string = "";

  addItem(): void{
    if(this.selectedCategory !== null && this.itemName.length > 0){
      const p: number = parseFloat(this.itemPrice);
      if(isNaN(p) || !isFinite(p)){
        //if price is not well-formed, do not add a new item to menu
        return;
      }
      const newItem : any = 
      {
        name: this.itemName,
        description: this.itemDescr,
        price: p,
      };
      this.$appDB.collection(this.selectedCategory.path).add(newItem);
    }
  }

  deleteItem(thisItem: menuItem): void{
    if(this.selectedCategory !== null){
      const id: string = thisItem.id;
      this.$appDB.collection(this.selectedCategory.path).doc(id).delete();
    }
  }

  updateName(): void{
    if(this.selectedCategory !== null && this.selectedItem !== null){
      const id: string = this.selectedItem.id;
      this.$appDB.collection(this.selectedCategory.path).doc(id)
        .update({name: this.itemName});
    }
  }

  updatePrice(): void{
    if(this.selectedCategory !== null && this.selectedItem !== null){
      const id: string = this.selectedItem.id;
      this.$appDB.collection(this.selectedCategory.path).doc(id)
        .update({price: parseFloat(this.itemPrice)})
    }
  }
  updateDescr(): void{
    if(this.selectedCategory !== null && this.selectedItem !== null){
      const id: string = this.selectedItem.id;
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

        //If the currently selected item has been removed by another user,
        //set this.selectedItem to null
        if(this.selectedItem !== null){

          let itemExists = false;
          for(const i of local.items){
            if(i.id === this.selectedItem.id) itemExists = true;
          }
          if(!itemExists){
            console.log("Selected item invalidated");
            this.selectedItem = null;
          }
        }

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