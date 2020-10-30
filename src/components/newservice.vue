<template>
  <div>
      <b-row>
                <b-col class="mb-3">
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters  v-for=" ToDo in ToDos" :key="ToDo.id">
                            <b-col md="6">
                                <b-card-img :src="require('../assets/programmering.jpg')" class="rounded-0 ">
                                </b-card-img>
                            </b-col>
                            <b-col md="6" >
                                <b-card-body class="text-primary centerText"  >
                                    <h2> {{ ToDo.name }}</h2>
                                    <b-card-text class="text-dark">
                                        <h6 class="mt-3 centerText">Tjänst 1</h6>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata1(ToDo.name, '3500 kr per månad', 'primary')"
                                        size="lg"
                                        class="mt-4"
                                        block
                                        variant="primary"
                                    >Boka Tjänst</b-button>
                                </b-card-body>
                            </b-col>
                        </b-row>
                         </b-card>
                </b-col>
     </b-row>
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
import {db} from "../firebase"

import Swal from "sweetalert2";
export default {
data(){
    return{
        ToDos:[],
        newItem:"",
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
                email: this.form.email
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

</style>