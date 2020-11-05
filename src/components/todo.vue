<template>
  <div class="container text-white">
    <form class="d-flex justify-content-between py-3">
      <div class="">
        <input
          class="border-0 rounded-pill bg-light justify-content-center"
          placeholder="New Todo"
          v-model="newItem"
        />
        <input
          class="border-0 rounded-pill bg-light justify-content-center"
          placeholder="New Toprice"
          v-model="newPrice"
        />
        <input
          class="border-0 rounded-pill bg-light justify-content-center"
          placeholder="New ToDes"
          v-model="newDes"
        />
        <h1>upload photo</h1>
        <input
          type="file"
          ref="input1"
          @change="previewImage"
          accept="image/*"
        />
             <div v-if="image != null ">
                <img class="preview" height="268" width="356" :src="image">
               
               </div>             
      </div>
      <div class="">
        <button
          class="text-warning border-0 px-4 rounded-pill bg-light"
          @click="addItem"
        >
          Add
        </button>
      </div>
    </form>
    <div
      class="d-flex justify-content-between py-3 border p-2"
      v-for="ToDo in ToDos"
      :key="ToDo.id"
    >
      <div class="">{{ ToDo.name }} , {{ ToDo.price }}</div>
      <div class="">
        <button class="btn-danger" @click="deleteToDo(ToDo.id)">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb} from "../firebase";
export default {
  data() {
    return {
      ToDos: [],
      newItem: "",
      newPrice: "",
      newDes: "",
     image : "",
     
    };
  },
  created() {
    db.collection("ToDos").onSnapshot((querySnapshot) => {
      this.ToDos = [];
      querySnapshot.forEach((doc) => {
        var x = doc.data();
        x.id = doc.id;
        this.ToDos.push(x);
      });
    });
  },
  methods: {
       previewImage(e) {
         let file = e.target.files[0];
         var storageRef = fb.storage().ref('PhotoGallery'+file.name);
      let uploadTask =   storageRef.put(file);
       uploadTask.on('state_changed',function()  {
        
     }, () => {
          // Handle unsuccessful uploads
       }, () =>{
             // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL;
              
            this.ToDos.image.push(downloadURL);
         console.log('File available at', downloadURL);
           });
       });

         console.log(e.target.files[0])
  },
 
    async addItem() {
    
      if (this.newItem)
        await db
          .collection("ToDos")
          .add({ name: this.newItem, price: this.newPrice, des: this.newDes , img:this.image });
           
      this.newItem = "";
      this.newPrice = "";
      this.newDes = "";
      this.image = null ;
      console.log(this.image )
    },
  },
  deleteToDo(id) {
    db.collection("ToDos").doc(id).delete();
  },

  firestore: {
    ToDos: db.collection("ToDos"),
  },
 
}
</script>

<style>
::placeholder {
  text-align: center;
  color: orange;
  border: none;
}
</style>