<template>
  <div class="container bg-white wd rounded">
       <p class="text-dark">register</p>
      <form action="" @submit.prevent="register">
    <label class="text-dark" > Enter your email </label><br>
      <input type="text" v-model="email" placeholder="Email"><br>
    <label class="text-dark"> Enter your password </label><br>
      <input type="password" v-model="password"><br>
      <button  type="submit">register</button><br>

     </form>
  </div>
</template>
<script>
import { auth } from '../firebase'

export default {
      data (){
    return {
      email:'',
      password :'',
     auth:''
    }
  },
   methods: {
      register :function (e){
   auth.createUserWithEmailAndPassword(this.email, this.password)
 
   .then( user => {
     console.log(`Account created for ${user.email}`);
     this.$router.push('/Account');
   },
   err => {
     alert(err.message);
   })
   e.preventDefault
     
  },
}}

</script>

<style>
.wd{
    width:50%
}
</style>