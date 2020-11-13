<template>
  <div class="container text-white">
    <form class="hei container " @submit.prevent="addItem">
      <div class="d-flex flex-column">
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New Todo"
          v-model="ToDo.name"
          required
        />
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New Toprice"
          v-model="ToDo.price"
          required
        />
        <input
          class="border-0 rounded-rounded py-1 mb-4 bg-light justify-content-center"
          placeholder="New ToDes"
          v-model="ToDo.des"
          required
        />
           <input
          type="file"
              style="display: none"
          ref="input1"
          @change="previewImage"
          accept="image/*"
          required
        />
                   <button @click="click1">choose photo</button>
 
             <div v-if="ToDo.image!= null">
                <img class="preview" height="268" width="356" :src="ToDo.image">   
             </div> 
                
      </div>
      <div class=" mb-4">
        <button
          class="text-white border-0 py-2 border-rounded container back"
         type="submit"
        >
          Add
        </button>
      </div>
    </form>
    <div class="container mb-2 ">
        <div class="row d-flex bg-white"  v-for=" ToDo in New" :key="ToDo.id" style="margin-bottom:50px; ">
            <div class="col-md-4 col-lg-4 col-sm-4" >
                <img :src="ToDo.image"  width="400px" height="300px">
                
            </div>
            <div class="col-md-8 col-lg-8 col-sm-8" >
                <div class="color centerText mt-2"  >
                    <h2 class="mt-3 bluetext"> {{ ToDo.name }}</h2>
                    
                        <h3 class="mt-3 centerText blacktext"> {{ ToDo.des }}</h3>
                            <div class="">
                              <button class="buttontext text-white border-0 mt-5 pr-5 pl-5 pt-1 pb-1 border-rounded px-2 back" @click="deleteToDo(ToDo.id)">delete</button>
                            </div> 
                </div>
            </div>
        </div>
    </div>  
  </div>
   
</template>

<script>
import { db , fb} from "../firebase";
export default {
  data() {
    return { 
      New:[],
      ToDo:{
      name: "",
      price: "",
      des: "",
      image :null
      },
  
    };
  },
  created(){
  db.collection('New')
    .onSnapshot((querySnapshot) => {
        this.New =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.New.push(x);
        });
      
    });
},
 
  methods: {
     deleteToDo(id) {
    db.collection("New").doc(id).delete();
  },
    click1() {
  this.$refs.input1.click()   
},
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
     
     db.collection("New").add(this.ToDo)
      this.ToDo.name = "";
      this.ToDo.price = "";
       this.ToDo.image =null;
      this.ToDo.des = "";
    },
    
  },
  click1() {
  this.$refs.input1.click()   
},
  deleteToDo(id) {
    db.collection("New").docRef(id).delete();
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
.color{
  color:orange;
}
.bluetext{
  color: blue;
}
.blacktext{
  color: black;
}
.buttontext{
  background-color: red;
  font-size: 1.2rem;
}
</style>