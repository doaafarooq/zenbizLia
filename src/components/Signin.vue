<template>
  <div>
  <div class="container bg-white wd rounded" >
    <div class="d-flex flex-column justify-content-center align-items-center" >
        <h2 class=" text-dark mt-4 mb-5">Sign in</h2>
        <form class=""  action="" @submit.prevent="signUp">
           <label class="text-dark" > Enter your email </label><br>
           <input class="px-4 mb-4 input1" type="text" v-model="email" placeholder=" enter your Email" required><br>
           <label class="text-dark"> Enter your password </label><br>
           <input class="px-4 mb-4 input1" type="password" v-model="password" placeholder=" enter your password "  required><br>
           <div class="class1"><button class="mb-4 button1" type="submit">Sign in</button></div>
           
             <div class="signup-buttons">
        <div id="fb-root" class=" "></div>
        <a href="#" class="google-signup " @click.prevent="googleSignIn()">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
            Google
        </a>
       </div>
        </form>
          <div class="mt-2 ml-5 mb-3 footer">
               <p class="text-dark">Don't have an account? <a  @click="goto"><button class="button3">Create one now</button></a> </p>
          </div>
          <button @click=" microsoftSignIn ()"> microsoft login </button>
          <button class="btn btn-primary" @click="signInFacebook()"> facebook </button>
  
    </div>
       
     </div>
     
    
  </div>
  
</template>


<script>

import {  auth } from '../firebase'
import firebase from 'firebase'
export default {
  data (){
    return {
      email:'',
      password :'',
     auth:'',
     OAuthAccessToken :''
    }
  },
 methods: {
   goto: function (){
      this.$router.push('/Register');
   },
    signUp :function (e){
   auth.signInWithEmailAndPassword(this.email, this.password)
   .then( user => {
     console.log(`Account created for ${user.email}`);
     this.$router.push('/Account');
   },
   err => {
     alert(err.message);
   })
   e.preventDefault
     
  },
  googleSignIn (){
   
   const  base_provider = new  firebase.auth.GoogleAuthProvider()
   base_provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      base_provider.addScope('profile');
       base_provider.addScope('email');
       auth.languageCode = 'pt';
       base_provider.setCustomParameters({
          prompt: 'select_account'
});
    auth.signInWithPopup(base_provider).then(function(result){
      let token = result.credential.accessToken;
     let user = result.user;
     console.log( 'sucess google account' + result + token + user)
        
     }).then( user => {
     this.$router.push('/Account');
     console.log(user)
   }).catch(function(err){
      alert('oops' + err.message)
      console.log(err)
      console.log("faild to do ")
     })
  },
  microsoftSignIn (){
  const provider = new firebase.auth.OAuthProvider('microsoft.com');
  provider.setCustomParameters({
       prompt: 'consent',
       login_hint: 'user@firstadd.onmicrosoft.com',
        tenant: 'f20eddbc-e4e5-4c15-abb0-5198b25ec5d8',
       client_id :'fdaf4852-e243-4400-b083-229f33838b20',
       redirect_url :'https://zebnizlia.firebaseapp.com/__/auth/handler',
      // response_type :'',
      // scope:''

});
provider.addScope('mail.read');
provider.addScope('calendars.read');
 auth.signInWithPopup(provider).then(function(result){
      let token = result.credential.accessToken;
     let user = result.user;
     console.log( 'sucess  microsoft account' + result + token + user)
        
     }).then( user => {
     this.$router.push('/Account');
     console.log(user)
   }).catch(function(err){
      alert('oops' + err.message)
      console.log(err)
      console.log("faild to do ")
//auth.signInWithPopup(provider)
  //    .then(function(result) {
    //    console.log(result)
       // if (result.credential.accessToken) {
         // this.OAuthAccessToken = result.credential.accessToken;
         // console.log("token ", result.credential.accessToken);
       // }
    //  })
      //.catch(function(error) {
       // console.log("fail ", error);
      });
  },
  signInFacebook (){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
             auth_type : 'reauthenticate',
           
});
    auth.signInWithPopup(provider).then(function(result){
      let token = result.credential.accessToken;
     let user = result.user;
     console.log( 'sucess facebook account' + result + token + user)
        
     }).then( user => {
     this.$router.push('/Account');
     console.log(user)
   }).catch(function(err){
      alert('oops' + err.message)
      console.log(err)
      console.log("faild to do ")
     })
  }
  }
}
</script>

<style>
.wd{
  width:50%;
}
.class1{
  text-align: center;
}
.button1{
  
  border: 1px solid transparent;
  background-color: blue;
  color: white;
  padding: 0.5rem 3rem;
  border-radius: 5px;
  margin: 2rem 0 0 0;
}
.button1:hover{
  background-color: rgb(70,130,180);
}
.button3{
  background-color: white;
  color: blue;
  border: 1px solid transparent;

}
.button3:hover{
  background-color: white;
  color: rgb(0,0,139);
  border: 1px solid transparent;

}
.input1{
  
}
</style>