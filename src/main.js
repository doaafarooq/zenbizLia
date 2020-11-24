import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'

import router from './router'

import {firebaseConfig} from './helpers/firebaseConfig'

Vue.use(VueRouter)

new Vue({
  router,
  created(){
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$router.push('/success')
      }else{
        this.$router.push('/auth')
      }
    });
  },
  el: '#app',
  render: h => h(App)
});
