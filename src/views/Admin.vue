<template>
<div  class="container text-white">
    <div>
        <b-navbar  >
        <b-navbar-brand href="#">
          <i class="logo">Zenbiz</i>

        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <router-link to="/">
                        <b-button size ="sm "
                         class="my-2 mr-2 my-sm-0">
                         <i class="fas fa-door-open"> </i> exit
                        </b-button>
                    </router-link>

                </b-nav-form>

            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
    </div>
    
    <todo />

    <b-container fluid class="bv-example-row mt-4">
        <div>
           <b-col cols="12" >
                <h2 class="text-white">Programmering</h2>
                <b-img :src="require('../assets/programmering.jpg')" fluid alt="Responsive image"></b-img>
                <b-table :fields="fields" bordered striped hover :items="programmering" class="text-white">
                    <template  v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('Programmering',
                         row.item.id)">Radera Bokningen
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" >
                <h2 >IT SÄKERHET</h2>
                <b-img :src="require('../assets/itsäkerhet.jpg')" fluid alt="Responsive image"></b-img>
                <b-table :fields="fields" bordered striped hover :items="itsäkerhet" class="text-white">
                    <template v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('ITSäkerhet',
                        row.item.id)">Radera Bokningen
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" >
                <h2 class="text-white">Redovisning</h2>
                <b-img :src="require('../assets/redovisning.jpg')" fluid alt="Responsive image"></b-img>
                <b-table :fields="fields" bordered striped hover :items="redovisning" class="text-white">
                    <template v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('Redovisning',
                         row.item.id)">Radera Bokningen
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" >
                <h2 class="text-white">IT Servis</h2>
                <b-img :src="require('../assets/itservis.jpg')" fluid alt="Responsive image"></b-img>
                <b-table :fields="fields" bordered striped hover :items="itservis" class="text-white">
                    <template v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('ITServis',
                         row.item.id)">Radera Bokningen
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12">
                <h2 >Kunder</h2>
                
                <b-table :fields="fieldsClient" bordered striped hover :items="clients" class="text-white">
                    <template v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('clients',
                         row.item.id)">Radera Kunder
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" >
                <h2 class="text-white">Kontakta Oss</h2>
                
                <b-table :fields="fieldsMessage" bordered striped hover :items="messages" class="text-white">
                    <template v-slot:cell(delete)= "row"> 
                        <b-button size ="md" variant ="danger" block @click="deletekey('messages',
                         row.item.id)">Radera Meddelande
                        </b-button>
                    </template>
                </b-table>
            </b-col>
        </div> 
    </b-container>
  
</div>
  
</template>

<script>
import {db} from "@/firebase"
import todo from "../components/todo"
export default {
    components: {
     todo
  },

data(){
    return{ 
      programmering:[],
        itservis : [],
        itsäkerhet:[],
        redovisning:[],
        clients:[],
        messages:[],
        fields:[
            {
                key:'id',
                label:'Id',
                sortable:true
            },
             {
                key:'clientID',
                label:'Client ID',
                sortable:true
            },
              {
                key:'name',
                label:'name',
                sortable:true
            },
              {
                key:'email',
                label:'email',
                sortable:true
            },
            {
                key:'price',
                label:'Price',
                sortable:true
            },
            {
                key:'day',
                label:'Day',
                sortable:true
            },
                {
                key:'delete',
                label:'Delete',
                sortable:true
            }
        ],
        fieldsClient:[
                {
                key:'id',
                label:'Id',
                sortable:true
            },
                   {
                key:'name',
                label:'Name',
                sortable:true
            },
          
                  {
                key:'email',
                label:'Email',
                sortable:true
            },

                  {
                key:'delete',
                label:'Delete',
                sortable:true
            },
             
            
        ],
        fieldsMessage:[
             {
                key:'id',
                label:'Id',
                sortable:true
            },
             {
                key:'message',
                label:'Message',
                sortable:true
            },
             {
                key:'email',
                label:'Email',
                sortable:true
            },

                  {
                key:'delete',
                label:'Delete',
                sortable:true
            },
            
        ]
    }
},
created(){
  db.collection('Programmering')
    .onSnapshot((querySnapshot) => {
        this.programmering =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.programmering.push(x);
        });
   
    });
    db.collection('Redovisning')
    .onSnapshot((querySnapshot) => {
        this.redovisning =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.redovisning.push(x);
        });
   
    });
    db.collection('clients')
    .onSnapshot((querySnapshot) => {
        this.clients =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.clients.push(x);
        });
   
    });

     db.collection('messages')
    .onSnapshot((querySnapshot) => {
        this.messages =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.messages.push(x);
        });
   
    });
    db.collection('ITSäkerhet')
    .onSnapshot((querySnapshot) => {
        this.itsäkerhet =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.itsäkerhet.push(x);
        });
   
    });
    db.collection('ITServis')
    .onSnapshot((querySnapshot) => {
        this.itservis =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.itservis.push(x);
        });
   
    });

},
methods:{
    deletekey(collection,id){
        db.collection(collection).doc(id).delete().then(function(){
            console.log("document is deleted");
        }).catch(function(error){
            console.error("error removing document" , error);
        });
    }
}



}
</script>

<style>


.xHolder {
	padding-top: .4rem;
	color: #EF5753;
	font-size: 2rem;
	transition-duration: .5s;
}

.xHolder i:hover {
	transition-duration: .5s;
	color: red;
	transform: rotate(90deg);
	font-size: 2.5rem;
	cursor: pointer;
}


</style>