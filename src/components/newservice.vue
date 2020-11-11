<template>
  <div>
    <b-container fluid class="bv-example-row mt-3 ">
      <b-row>
                <b-col class="mb-4" md="6" v-for=" ToDo in New" :key="ToDo.id">
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters >
                            <b-col md="6">
                                <b-card-img :src="ToDo.image" class="rounded-0 pictures">
                                </b-card-img>
                            </b-col>
                            <b-col>
                                <b-card-body class="text-primary centerText"  >
                                    <h2> {{ ToDo.name }}</h2>
                                    <b-card-text class="text-dark">
                                        <h3 class="mt-3 centerText"> {{ ToDo.des }}</h3>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata1(ToDo.name, ToDo.price , 'primary')"
                                        size="lg"
                                        class=""
                                        block
                                        variant="primary"
                                    >Boka Tjänst</b-button>
                                </b-card-body>
                            </b-col>
                        </b-row>
                         </b-card>
                </b-col>
     </b-row>
    </b-container>
    <b-modal hide-footer id="my-modal1" :title="form.service">
            <b-form @submit="onSubmit">
                <b-form-group id="input-group-1" label="Namn:" label-for="input-1">
                    <b-form-input
                        id="input-1"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Ange Namn"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="E-post:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.email" required placeholder="Ange E-post">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Datum till Bokningen:" label-for="input-2">
                    <b-form-input
                        id="input-2q"
                        v-model="form.date"
                        type="date"
                        required
                        placeholder="Ange Datum"
                    ></b-form-input>
                </b-form-group>
                 <b-form-group id="input-group-2" label="Pris av bokningen:" label-for="input-2">
                    <b-form-input id="input-2qa" v-model="form.price" required disabled>
                    </b-form-input>
                </b-form-group>
                <b-button class="text-white" block type="submit" :variant="color">Bookning
                </b-button>
            </b-form>
        </b-modal>
   

  </div>
</template>

<script>
import {db , fb} from "../firebase"
import Swal from "sweetalert2";
export default {
data(){
    return{
      New:[],
      ToDo:{
      name: "",
      price: "",
      des: "",
      image :null
      },
       
         form: {
                email: "",
                name: "",
                service: "",
                price: "",
                date: ""
            },
            color: ""
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
methods:{
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
      if(this.ToDo){
  
     db.collection("New").add(this.ToDo)
     .then(function(docRef){
       console.log("document written with Id ", docRef.id)
       this.ToDo = "";
    
     
     })
      .catch(function(error){
       console.log("document written with Id ", error)
     })
      }   
    },
      
    
  },
  firestore: {
    New: db.collection("New"),
  },
    
        modaldata1( service, price, color) {
            this.$bvModal.show("my-modal1");
            this.form.service = service;
            this.color = color;
            this.form.price = price;
        },
         onSubmit(evt) {
            evt.preventDefault();
            db.collection("clients")
            .add({
                name: this.form.name,
                email: this.form.email,
                date: this.form.date,
                service: this.form.service
            })
            .then(docRef => {
                db.collection(this.form.service)
                .add({
                    clientID: docRef.id,
                    service: this.form.service,
                    price: this.form.price,
                    day: this.form.date
                })
                .then(d => {
                    Swal.fire("Bokningen har skapats och sparats!", `Reservation id: ${d.id}`, "success");
                    this.$bvModal.hide("my-modal1");
                    this.form.email = "";
                    this.form.name = ""
                });
            });
        },
    }
    
}
</script>


<style>
.centerText{
    text-align: center
}
.pictures{
    width: 400px;
    height: 511px;
}
</style>