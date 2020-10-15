<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">
                <i class="logo">Zenbiz</i>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button
                            @click="modaldata2('Check Reservation', 'success')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-door-open"></i>Check Reservation
                        </b-button>
                        <b-button
                            @click="modaldata2('Cancel Reservation', 'danger')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-window-close"></i>Cancel Reservation
                        </b-button>
                        <b-button
                            @click="modaldata2('Contact', 'primary')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-phone"></i>Contact
                        </b-button>
                        <b-button
                            @click="modaldata2('Administrator', 'dark')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-user"></i>Administrator
                        </b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal hide-footer id="my-modal2" :title="title">
            <b-form @submit="onSubmit2">
                <b-form-group
                    v-if="color != 'primary' && color != 'dark'"
                    id="input-group-1"
                    label="Reservation ID:"
                    label-for="input-1"
                >
                    <b-form-input
                        v-if="color != 'primary' && color != 'dark'"
                        id="input-1"
                        v-model="form.reservationid"
                        type="text"
                        required
                        placeholder="Enter Reservation ID"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    v-if="color != 'primary' && color != 'dark'"
                    id="input-group-3"
                    label="Service:"
                    label-for="input-3"
                >
                    <b-form-select id="input-3" v-model="form.service" :options="services" required>
                    </b-form-select>
                </b-form-group>
                <!--buradan baslayacan emaille -->
            </b-form>

        </b-modal>
    </div>
</template>

<script>
import {db} from '../firebase';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            form:{
                reservationid: "",
                message: "",
                service:null,
                email: ''
            },
            services:[
                {text:"Välj en", value:null},
                "Daglig",
                "Veckovis",
                "Månadsvis",
                "Periodisk"
            ],
            color: "",
            title: "",
            show: false,
            reservation: {
                id: "",
                name: "",
                email: "",
                day: "",
                price: ""
            },
            admin: {
                user: "Elvin",
                pass: '1234567890'
            },
            admininput:{
                user: '',
                pass: ''
            }
        }
    },
    methods: {
        onSubmit2(evt) {
            this.show=false;
            evt.preventDefault();
            switch(this.title){
                case 'Cancel Reservation': 
                    db.collection(this.form.service)
                        .doc(this.form.reservationid)
                        .delete()
                        .then(()=>{
                            this.$bvModal.hide('my-modal2')
                            Swal.fire({
                                icon: 'success',
                                title: 'Bokningen avbokad'
                            });
                        })
                        .catch(()=>{
                            console.log('Error - Bokningen avbokad')
                        });
                        break;
                case 'Contact':
                    db.collection("messages")
                        .add({message: this.form.message,email:this.form.email})
                        .then(()=>{
                            this.$bvModal.hide("my-modal2");
                            Swal.fire({
                                icon: 'success',
                                title: 'Meddelande skickat'
                            });
                        })
                        .catch(()=>{
                            console.log('Error - Meddelande')
                        })
                        break;
                case 'Administrator':
                    if(this.admin.user == this.admininput.user && this.admin.pass == this.admininput.pass){
                        this.$router.push('/admin')
                    }else{
                        Swal.fire({
                                icon: 'error',
                                title: 'Felaktig'
                            });
                    }
                    break;
                default:
                    db.collection(this.form.service)
                        .doc(this.form.reservationid)
                        .get()
                        .then(doc => {
                            if(doc.exists){
                                db.collection('clients')
                                    .doc(doc.data().clientID)
                                    .get()
                                    .then(doc2 =>{
                                        this.showinfo(doc,doc2)
                                    })
                            }else{
                                console.log('error')
                            }
                        })
                        .catch(()=>{
                            console.log('error')
                        });
                    break;
            }
        },
        modaldata2(title,color){
            this.$bvModal.show("my-modal2");
            this.color = color;
            this.title = title;
            this.form.reservationid = "";
            this.form.service = null;
            this.form.message = "";
            this.form.email = "";
            this.reservation.id = "";
            this.reservation.name = "";
            this.reservation.email = "";
            this.reservation.day = "";
            this.reservation.price = "";
            this.admininput.user = '';
            this.admininput.pass = '';
            this.show = false;

        },
        showinfo(doc,doc2){
            this.show = true;
            this.reservation.id = doc.id;
            this.reservation.name = doc2.data().name;
            this.reservation.email = doc2.data().email;
            this.reservation.day = doc.data().day;
            this.reservation.price = doc.data().price;
        }
    }
}
</script>

<style>
.logo{
    font-size: 40px;
}
@media(max-width: 768px){
    .logo {
        font-size: 20px;
    }
}
i{
    color: orange;
}
button:hover{
    background-color: orange;
}
button:hover > i {
    color: white;
}
</style>