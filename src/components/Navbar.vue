<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">
                <i class="logo">Zenbiz</i>
            </b-navbar-brand>
        </b-navbar>
        <b-navbar-toggle id="nav-collapse">
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-button>

                    </b-button>
                </b-nav-form>
            </b-navbar-nav>
            
        </b-collapse>
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
                case 'Avboka bokningen': 
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
                    
            }
        }
    },
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