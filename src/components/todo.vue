<template>
  <div class="container text-white" >
      <div  class=" d-flex justify-content-between  py-3">
          <div class="">
              <input class="border-0 rounded-pill bg-light justify-content-center" placeholder="New Todo"  v-model="newItem" @keyup.enter="addItem">
          </div>
          <div class="">
              <button class="text-warning border-0 px-4 rounded-pill bg-light" @click="addItem"> Add </button>
          </div>

      </div>
      <div  class="d-flex justify-content-between  py-3 border p-2" v-for=" ToDo in ToDos" :key="ToDo.id">
         
              <div class=""> {{ ToDo.name }}</div>
              <div class="">
                  <button class="btn-danger" @click="deleteToDo(ToDo.id)">delete</button>
              </div>
        
      </div>
 
  </div>
</template>

<script>
import {db} from "../firebase"
export default {
data(){
    return{
        ToDos:[],
        newItem:"",
    }
},
created(){
  db.collection('ToDos')
    .onSnapshot((querySnapshot) => {
        this.ToDos =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.ToDos.push(x);
        });
      
    });
},
methods:{
   async addItem(){
        if(this.newItem){
            await db.collection("ToDos").add({ name : this.newItem });
            this.newItem = "";
        }
    },
    deleteToDo(id){
        db.collection("ToDos").doc(id).delete();
    },
    

},
firestore: {
    ToDos: db.collection("ToDos")
},

}
</script>

<style>
::placeholder {
    text-align: center;
    color:orange;
    border:none;
}

</style>