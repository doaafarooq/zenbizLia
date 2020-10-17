<template>
    <div>
        <b-container fluid class="bv-example-row mt-4">
            <b-row>
                <b-col>
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/carousel1.jpg')" class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-primary" title="Daglig">
                                    <b-card-text class="text-dark">
                                        <h2 class="mt-4">Redovisning</h2>
                                        <h6 class="mt-4">Tjänst 1</h6>
                                        <p class="mt-4">Tjänst 2</p>
                                        <p class="mt-4">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Daglig', 500, 'primary')"
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
                                <b-card-img :src="require('../assets/carousel1.jpg')" class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-success" title="Veckovis">
                                    <b-card-text class="text-dark">
                                        <h2 class="mt-4">Redovisning</h2>
                                        <h6 class="mt-4">Tjänst 1</h6>
                                        <p class="mt-4">Tjänst 2</p>
                                        <p class="mt-4">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Veckovis', 500, 'success')"
                                        size="lg"
                                        class="mt-4"
                                        block
                                        variant="success"
                                    >Boka Tjänst</b-button>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img :src="require('../assets/carousel1.jpg')" class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-warning" title="Månadsvis">
                                    <b-card-text class="text-dark">
                                        <h2 class="mt-4">Redovisning</h2>
                                        <h6 class="mt-4">Tjänst 1</h6>
                                        <p class="mt-4">Tjänst 2</p>
                                        <p class="mt-4">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Månadsvis', 800, 'warning')"
                                        size="lg"
                                        class="mt-4 text-light"
                                        block
                                        variant="warning"
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
                                <b-card-img :src="require('../assets/carousel1.jpg')" class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body class="text-dark" title="Periodisk">
                                    <b-card-text class="text-dark">
                                        <h2 class="mt-4">Redovisning</h2>
                                        <h6 class="mt-4">Tjänst 1</h6>
                                        <p class="mt-4">Tjänst 2</p>
                                        <p class="mt-4">Tjänst 3</p>
                                    </b-card-text>
                                    <b-button
                                        @click="modaldata('Periodisk', 1000, 'dark')"
                                        size="lg"
                                        class="mt-4"
                                        block
                                        variant="dark"
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
                 <b-form-group id="input-group-2" label="Pris per dag:" label-for="input-2">
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
import { db } from "../firebase";
import Swal from "sweetalert2";
export default {
    data(){
        return {
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
    methods: {
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
                    Swal.fire("Toppen!", `Reservation id: ${d.id}`, "success");
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
img {
    height: 300px !important;
}
</style>