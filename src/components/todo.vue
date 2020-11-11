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
<<<<<<< HEAD
=======
          type="number"
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
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
          ref="input1"
          @change="previewImage"
          accept="image/*"
          required
<<<<<<< HEAD
        
        />
=======
        />
     
   
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
             <div v-if=" ToDo.image != null">
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
<<<<<<< HEAD
        <div class="row d-flex bg-white"  v-for=" ToDo in New" :key="ToDo.id" style="margin-bottom:50px; ">
            <div class="col-md-4 col-lg-4 col-sm-4" >
                <img :src="ToDo.image"  width="400px" height="300px" class="newpictures">
                
            </div>
            <div class="col-md-8 col-lg-8 col-sm-8" >
                <div class="color centerText mt-5"  >
                    <h2 class="centeralblue"> {{ ToDo.name }}</h2>
                    
                        <h3 class="mt-3 centerText centeral"> {{ ToDo.des }}</h3>
                            <div class="centerbutton1">
                              <button class="centerbutton text-white pr-5 pl-5 pt-1 pb-1 border-0 border-rounded back" @click="deleteToDo(ToDo.id)">delete</button>
                            </div> 
                </div>
            </div>
        </div>
    </div>  
=======
                        <div class="row d-flex bg-white"  v-for=" ToDo in New" :key="ToDo.id" style="margin-bottom:50px; ">
                            <div class="col-md-4 col-lg-4 col-sm-4" >
                                <img :src="ToDo.image"  width="300px" height="400px">
                               
                            </div>
                            <div class="col-md-8 col-lg-8 col-sm-8" >
                                <div class="color centerText mt-2"  >
                                    <h2> {{ ToDo.name }}</h2>
                                   
                                        <h2 class="mt-3 centerText"> {{ ToDo.des }}</h2>
                                           <div class="">
                                              <button class=" text-white border-0 border-rounded px-2 back" @click="deleteToDo(ToDo.id)">delete</button>
                                           </div> 
                                </div>
                            </div>
                        </div>
              </div>  
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
  </div>
   
</template>

<script>
import { db , fb} from "../firebase";
<<<<<<< HEAD
=======

>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
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
<<<<<<< HEAD
 
  methods: {
     deleteToDo(id) {
    db.collection("New").doc(id).delete();
  },
      previewImage  (e) {
=======
  methods: {

     deleteToDo(id) {
    db.collection("New").doc(id).delete();
  },
      previewImage(e) {
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
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
<<<<<<< HEAD
       });
       
  },
 
   async addItem() {
      if(this.ToDo){
  
     db.collection("New").add(this.ToDo)
     .then(function(docRef){
       console.log("document written with Id ", docRef.id)
         this.ToDo = {
               name: "",
               price: "",
               des: "",
               image:null
    };
    
     })
      .catch(function(error){
       console.log("document written with Id ", error)
     })
      }   
    },
      
    
  },
  deleteToDo(id) {
    db.collection("New").docRef(id).delete();
=======
       }); 
  },
 
   async addItem() { 
     db.collection("New").add(this.ToDo)
       this.ToDo.name = "";
         this.ToDo.price = "";
         this.ToDo.des = "";
          this.ToDo.image = null;
    // .then(function(docRef){
      // console.log("document written with Id ", docRef.id)
        
    // })
    //  .catch(function(error){
    //   console.log("document written with Id ", error)
   //  })
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
  },
  firestore: {
    New: db.collection("New"),
  },
<<<<<<< HEAD
=======
  }
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
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
<<<<<<< HEAD
.newpictures{
  padding: 0.5rem;
}
.centeralblue{
  color: blue;
}
.centeral{
  color: black;
}
.centerbutton{ 
  background-color: red;
}
.centerbutton1{
  margin: 3rem !important;
  font-size: 1.2rem;

}
=======
>>>>>>> 9cb3df0d28ecd26e4f67c1e3aaa267b335a3bedc
</style>