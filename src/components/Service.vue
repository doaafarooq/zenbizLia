<template>
    <div>
        <b-container fluid class="bv-example-row mt-4">
            <b-row>
                <b-col class="mb-3">
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/programmering.jpg')" class="rounded-0 ">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-primary centerText"  title="Programmering">
                                    <b-card-text class="text-dark">
                                        <h6 class="mt-3 centerText">Tjänst 1</h6>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Programmering', '3500 kr per månad', 'primary')"
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
                <b-col>
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/itservis.jpg')" class="rounded-0 ">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-primary centerText" title="IT Servis">
                                    <b-card-text class="text-dark">
                                        
                                        <h6 class="mt-3 centerText">Tjänst 1</h6>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('IT Servis', '4500 kr per månad', 'primary')"
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
            <b-row class="mt-3">
                <b-col class="mb-3">
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/itsäkerhet.jpg')" class="rounded-0 ">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-primary centerText" title="IT Säkerhet">
                                    <b-card-text class="text-dark">
                                        
                                        <h6 class="mt-3 centerText">Tjänst 1</h6>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('IT Säkerhet', '3500 kr per månad', 'primary')"
                                        size="lg"
                                        class="mt-4 text-light"
                                        block
                                        variant="primary"
                                    >Boka Tjänst</b-button>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/redovisning.jpg')" class="rounded-0 ">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-primary centerText" title="Redovisning">
                                    <b-card-text class="text-dark">
                                        
                                        <h6 class="mt-3 centerText">Tjänst 1</h6>
                                        <p class="mt-3 centerText">Tjänst 2</p>
                                        <p class="mt-3 centerText">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Redovisning', '4000 kr per månad', 'primary')"
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
        </b-container>
        <b-modal hide-footer id="my-modal" :title="form.service">
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
        <newservice />
    </div>
</template>

<script>
import { db } from "../firebase";
import Swal from "sweetalert2";
import newservice from "../components/newservice"
export default {
    components:{
        newservice
    },
    data(){
        return {
            form: {
                email: "",
                name: "",
                service: "",
                price: "",
                date: "",
               
            },
            color: ""
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();

            db.collection("clients")
            .add({
                name: this.form.name,
                email: this.form.email,
              
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
                    this.$bvModal.hide("my-modal");
                    this.form.email = "";
                    this.form.name = ""
                });
            });
        },
        modaldata(service, price, color) {
            this.$bvModal.show("my-modal");
            this.form.service = service;
            this.color = color;
            this.form.price = price;
        }
    }
}
</script>

<style scoped>
.centerText{
    text-align: center
}
</style>