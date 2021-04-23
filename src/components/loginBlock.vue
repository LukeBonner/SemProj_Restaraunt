<template>
    <div id="loginBlock">
        <section>
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model="userEmail"><br><br>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model="userPassword"><br><br>
          <button :disabled="noInput" type="button" id="signup" v-on:click="createAccount()">Signup</button>
          <button :disabled="noInput" type="button" id="signin" v-on:click="authenticate()">Signin</button>
          <div id="message">{{message}}</div>
        </section>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import "firebase/auth";
import { FirebaseAuth,UserCredential } from "@firebase/auth-types";
import "firebase/firestore"

@Component
export default class myExpense extends Vue{
    private userEmail = "";
    private userPassword = "";
    private message = "";
    readonly $appAuth!: FirebaseAuth;
    $router: any;
    


    get noInput(): boolean {
     return this.userEmail.length === 0 || this.userPassword.length === 0;
    }

    createAccount(): void {
    this.$appAuth
        .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
            this.showMessage(`User create UID ${u.user?.uid}`);
            this.$router.replace({ path: "/selection" });
            })
        .catch((err: any) => {
            let error : string = String(err);
            console.log(error.slice(0,7));
            if( error.slice(0,7) === "Error: "){
              error = error.slice(7);
            }
            this.showMessage(`Unable to create account: ${error}`);
        });    
    }

    authenticate(): void {
    this.$appAuth
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
            this.showMessage(`Login successful UID ${u.user?.uid}`);
            this.$router.replace({ path: "/selection" });
        })
        .catch((err: any) => {
            let error : string = String(err);
            console.log(error.slice(0,7));
            if( error.slice(0,7) === "Error: "){
              error = error.slice(7);
            }
            this.showMessage(`Unable to create account: ${error}`);
        });
    }

    showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {    // Auto disappear after 5 seconds
        this.message = "";
    }, 5000);
    }
}


</script>

<style scoped>
label {
  font-size: 100%;
  color: white;
  text-shadow: 0 0 2px black;
  margin-right: 10px;
}

button {
  margin-right: 15px;
}

#message{
  font-size: 115%;
  color: white;
  text-shadow: 0 0 2px black;
}

</style>