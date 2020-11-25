<template>
  <div class="mt-3 ml-3">
      <div class="text-white">{{currentUser}} </div>
     <button class="mt-2" v-on:click="logout"> logout </button>
  </div>
  
</template>

<script>
import {auth} from '../firebase'
export default {
name:'Account',
data (){
    return {
        isloggedIn : false,
        currentUser: false
    }
    
},
  created(){
    if(auth.currentUser){
      this.isloggedIn = true ,
      this.currentUser = auth.currentUser.email;
    }
  },
methods: {
logout :function(){
    auth.signOut().then(() => {
        
         
        this.$router.push('/Login')

    })
}
}
}

</script>

<style>

</style>