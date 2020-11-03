<template>
  <div class="container text-white" >
      <form  class=" d-flex justify-content-between  py-3">
          <div class="">
            <input class="border-0 rounded-pill bg-light justify-content-center" placeholder="New Todo"  v-model="newItem" >
            <input class="border-0 rounded-pill bg-light justify-content-center" placeholder="New Toprice"  v-model="newPrice" >
            <input class="border-0 rounded-pill bg-light justify-content-center" placeholder="New ToDes"  v-model="newDes" >
            <h1>upload photo</h1>
   
                <input type="file" ref="input1"
                       @change="previewImage()" accept="image/*" >  
            <button  @click="click1()">>choose photo</button>
            
       <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
       <br>
       </div>   
              
            <button  @click="create()">>upload</button>
          </div>
          <div class="">
              <button class="text-warning border-0 px-4 rounded-pill bg-light" @click="addItem"> Add </button>
          </div>

      </form>
      <div  class="d-flex justify-content-between  py-3 border p-2" v-for=" ToDo in ToDos" :key="ToDo.id">
         
              <div class=""> {{ ToDo.name }} ,  {{ ToDo.price }}  </div>
              <div class="">
                  <button class="btn-danger" @click="deleteToDo(ToDo.id)">delete</button>
              </div>
        
      </div>
 
  </div>
</template>

<script>
import {db, fb} from "../firebase"
import {storage} from "../firebase"

export default {
data(){
    return{
        ToDos:[],
        newItem:"",
        newPrice:"",
        newDes:"",
        img1: '',
        imageData: null
  
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
        if(this.newItem )
            await db.collection("ToDos").add({ name : this.newItem, price : this.newPrice , des: this.newDes});
            this.newItem = "";
            this.newPrice = "";
            this.newDes ="";
        }
    },
    deleteToDo(id){
        db.collection("ToDos").doc(id).delete();
    },
   
firestore: {
    ToDos: db.collection("ToDos")
},
 create () {
      
      const post = {
        photo: this.img1,
              
      }
      fb.ref('PhotoGallery').push(post)
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
  click1() {
  this.$refs.input1.click()   
},
previewImage(event) {
  this.uploadValue=0;
  this.img1=null;
  this.imageData = event.target.files[0];
  console.log(event.target.files[0])
  this.onUpload()
},
onUpload(){
  this.img1=null;
  const storageRef=storage.ref(`${this.imageData.name}`).put(this.imageData);
  storageRef.on(`state_changed`,snapshot=>{
  this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    }, error=>{console.log(error.message)},
  ()=>{this.uploadValue=100;
      storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.img1 =url;
          console.log(this.img1)
        });
      }      
    );
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