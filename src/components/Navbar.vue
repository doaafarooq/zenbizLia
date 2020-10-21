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
                            @click="modaldata2('Kontrollera Bokningen', 'success')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class=""></i>Kontrollera Bokningen
                        </b-button>
                        <b-button
                            @click="modaldata2('Avboka Bokningen', 'danger')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-window-close mr-1"></i>Avboka Bokningen
                        </b-button>
                        <b-button
                            @click="modaldata2('Kontakta Oss', 'primary')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-envelope mr-1"></i>Kontakta Oss
                        </b-button>
                        <b-button
                            @click="modaldata2('Administratör', 'dark')"
                            size="sm"
                            class="my-2 mr-2 my-sm-0"
                        >
                            <i class="fas fa-user mr-1"></i>Administratör
                        </b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal hide-footer id="my-modal2" :title="title">
            <b-form @submit="onSubmit2" @submit.prevent="sendEmail">
                <b-form-group
                    v-if="color != 'primary' && color != 'dark'"
                    id="input-group-1"
                    label="Bokning ID:"
                    label-for="input-1"
                >
                    <b-form-input
                        v-if="color != 'primary' && color != 'dark'"
                        id="input-1"
                        v-model="form.reservationid"
                        type="text"
                        required
                        placeholder="Ange Bokning ID"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    v-if="color != 'primary' && color != 'dark'"
                    id="input-group-3"
                    label="Tjänster:"
                    label-for="input-3"
                >
                    <b-form-select id="input-3" v-model="form.service" :options="services" required>
                    </b-form-select>
                </b-form-group>
               

                <b-form-group 
                    v-if="color == 'primary'"
                    id="input-group-1"
                    label="E-post:"
                    label-for="input-1"
                >
                    <b-form-input
                        v-if="color == 'primary'"
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        name="email"
                        placeholder="Ange E-post"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    v-if="color =='primary'"
                    id="input-group-1"
                    label="Meddelande:"
                    label-for="input-1"
                >
                    <b-form-textarea
                        id="textarea"
                        v-model="form.message"
                        placeholder="Ange Meddelande..."
                        rows="3"
                        max-rows="6"
                        name="message"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group
                    v-if="color =='dark'"
                    id="input-group-1"
                    label="Admin:"
                    label-for="input-1"
                >
                    <b-form-input
                        v-if="color =='dark'"
                        id="input-1"
                        v-model="admininput.user"
                        type="text"
                        required
                        placeholder="Ange Användarnamn"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    v-if="color == 'dark'"
                    id="input-group-1"
                    label="Lösenord:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="admininput.pass"
                        type="password"
                        required
                        placeholder="Ange Lösenord"
                    ></b-form-input>
                </b-form-group>

                <b-button class="text-white" block type="submit" :variant="color">{{title}}</b-button>
            </b-form>
            <b-card v-if="show && color=='success'" title="Reservation" class="mb-2 mt-4">
                <b-card-text>
                    <h6>Reservation id : {{reservation.id}}</h6>
                    <h6>Namn : {{reservation.name}}</h6>
                    <h6>E-post : {{reservation.email}}</h6>
                    <h6>Dag : {{reservation.day}}</h6>
                    <h6>Pris : {{reservation.price}}</h6>
                </b-card-text>
            </b-card>
        </b-modal>
    </div>
</template>

<script>
import {db} from '../firebase';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

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
                "Programmering",
                "IT Servis",
                "IT Säkerhet",
                "Redovisning"
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
                user: "alaa",
                pass: '1234567890'
            },
            admininput:{
                user: '',
                pass: ''
            }
        }
    },
    methods: {

        sendEmail: (e) => {
      emailjs.sendForm('gmail', 'template_ytz51qg', e.target, 'user_1MQXW3ydVjgKS3jeUlZUd')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    },




        onSubmit2(evt) {
            this.show=false;
            evt.preventDefault();
            switch(this.title){
                case 'Avboka Bokningen': //eller Avboka Bokningen
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
                case 'Kontakta Oss': //eller Kontakta Oss
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
                case 'Administratör': //eller administratör
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