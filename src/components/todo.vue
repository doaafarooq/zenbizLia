<template>
  <div class="container text-white">
    <form class="hei container ">
      <div class="d-flex flex-column">
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New Todo"
          v-model="ToDo.name"
        />
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New Toprice"
          v-model="ToDo.price"
        />
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New ToDes"
          v-model="ToDo.des"
        />
           <input
          type="file"
          ref="input1"
          @change="previewImage"
          accept="image/*"
        />
             <div v-if="ToDo.image != null ">
                <img class="preview" height="268" width="356" :src="ToDo.image">
               
               </div> 
                
      </div>
      <div class=" mb-4">
        <button
          class="text-white border-0 py-2 border-rounded container back"
          @click="addItem"
        >
          Add
        </button>
      </div>
    </form>
    <div class="container">
        <div
      class="d-flex justify-content-between  py-3 border p-2"
      v-for="ToDo in New"
      :key="ToDo.id"
     >
        <div class="">{{ ToDo.name }} , {{ ToDo.price }}</div>
 
        <div class="">
           <button class="btn-danger" @click="deleteToDo(ToDo.id)">delete</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { db, fb} from "../firebase";
export default {
  data() {
    return {
      New: [],
      ToDo:{
      name: "",
      price: "",
      des: "",
      image :""
      },
   
   
     

    };
  },
  created() {
    db.collection("New").onSnapshot((querySnapshot) => {
      this.New = [];
      querySnapshot.forEach((doc) => {
        var x = doc.data();
        x.id = doc.id;
        this.New.push(x);
       
      });
    });
  },
  methods: {
      previewImage  (e) {
         let file = e.target.files[0];
         var storageRef = fb.storage().ref('PhotoGallery'+file.name);
     let uploadTask = storageRef.put(file);
       uploadTask.on('state_changed',function()  {
        
     }, () => {
          // Handle unsuccessful uploads
       }, () =>{
             // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.ToDo.image = downloadURL; 
                 
         console.log('File available at', downloadURL);
           });
       });

       
  },
 
    async addItem() {
    
     db.collection("New").add(this.ToDo);
     //  db
       //   .collection("New")
       //   .add({ name: this.name, price: this.price, des: this.des , image :this.image });
           
     // this.name = "";
     // this.price = "";
     // this.des= "";
     // this.image = "" ;
      
    },
      
    
  },
  deleteToDo(id) {
    db.collection("New").doc(id).delete();
  },

  firestore: {
    New: db.collection("New"),
  },

}
</script>

<style>
::placeholder {
  text-align: center;
  color: orange;
  border: none;
}
.hei{
  width:50%
}
.back{
  background-color:orange;
}
</style>