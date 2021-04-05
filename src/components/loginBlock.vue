<template>
    <div id="loginBlock">
        <section>
           
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
            this.$router.push({ path: "/category" });
            })
        .catch((err: any) => {
            this.showMessage(`Unable to create account ${err}`);
            });    
    }

    authenticate(): void {
    this.$appAuth
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
            this.showMessage(`Login successful UID ${u.user?.uid}`);
            this.$router.push({ path: "/expenses" });
        })
        .catch((err: any) => {
            this.showMessage(`Unable to login ${err}`);
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

</style>