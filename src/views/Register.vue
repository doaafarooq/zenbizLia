<template>
  <div class="container bg-white wd rounded d-flex flex-column justify-content-center align-items-center">
       <h2 class="text-dark mt-4 mb-4">Register</h2>
      <form action="" @submit.prevent="register">
    <label class="text-dark" > Enter your email </label><br>
      <input type="text" v-model="email" placeholder="Email"><br>
    <label class="text-dark mt-3"> Enter your password </label><br>
      <input type="password" v-model="password"><br>
      <div class="centeral"><button  class="button2" type="submit">register</button><br></div>

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
.centeral{
  text-align: center;
}
.button2{
    border: 1px solid transparent;
  background-color: blue;
  color: white;
  padding: 0.5rem 3rem;
  border-radius: 5px;
  margin: 2rem 0 2rem 0;
}
.button2:hover{
  background-color: rgb(70,130,180);
  color: white;
}
</style>