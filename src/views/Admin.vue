<template>
<div >
    <b-navbar toggleable="lg" >
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
    <b-container fluid class="bv-example-row mt-4">
       
            <div>
                                <h2>Programmering</h2>
                               
                                <b-table :fields="fields" bordered striped hover :items="Programmering">
                                    <template v-slot:cell(delete)= "row"> 
                                        <b-button size ="md" variant ="danger" block @click="deletekey('Programmering', row.item.id)">delete
                                        </b-button>
                                    </template>

                                </b-table>
            </div>
            <div>
                                <h2>IT SÄKERHET</h2>
                                
                                <b-table :fields="fields" bordered striped hover :items="ITSäkerhet">
                                    <template v-slot:cell(delete)= "row"> 
                                        <b-button size ="md" variant ="danger" block @click="deletekey('ITSäkerhet',row.item.id)">delete
                                        </b-button>
                                    </template>

                                </b-table>
            </div>
            <div >
                                <h2>Redovisning</h2>
                                
                                <b-table :fields="fields" bordered striped hover :items="Redovisning">
                                    <template v-slot:cell(delete)= "row"> 
                                        <b-button size ="md" variant ="danger" block @click="deletekey('Redovisning', row.item.id)">delete
                                        </b-button>
                                    </template>

                                </b-table>
            </div>
             <div>
                                <h2>clients</h2>
                                
                                <b-table :fields="fields" bordered striped hover :items="clients">
                                    <template v-slot:cell(delete)= "row"> 
                                        <b-button size ="md" variant ="danger" block @click="deletekey('clients', row.item.id)">delete
                                        </b-button>
                                    </template>

                                </b-table>
            </div>
            
       
           
           
           


           
     
    </b-container>
</div>
  
</template>

<script>
import {db} from "@/firebase"
export default {
data(){
    return{
      Programmering :[],
        ITServis : [],
        ITSäkerhet:[],
        Redovisning:[],
        clients:[],
        messages:[],
        fields:[
            {
                key:'id',
                lablel:'Id',
                sortable:true
            },
             {
                key:'clientID',
                lablel:'client ID',
                sortable:true
            },
              {
                key:'name',
                lablel:'name',
                sortable:true
            },
              {
                key:'email',
                lablel:'email',
                sortable:true
            },
                {
                key:'delete',
                lablel:'Delete',
                sortable:true
            }
        ],
        fieldsclient:[
                {
                key:'id',
                lablel:'Id',
                sortable:true
            },
                   {
                key:'name',
                lablel:'Name',
                sortable:true
            },
          
                  {
                key:'email',
                lablel:'Email',
                sortable:true
            },

                  {
                key:'delete',
                lablel:'Delete',
                sortable:true
            },
             
            
        ],
        fieldsMessage:[
             {
                key:'id',
                lablel:'Id',
                sortable:true
            },
             {
                key:'message',
                lablel:'Message',
                sortable:true
            },
             {
                key:'email',
                lablel:'Email',
                sortable:true
            },

                  {
                key:'delete',
                lablel:'Delete',
                sortable:true
            },
        ]
    }
},
created(){
    db.collection('Programmering')
    .onSnapshot((querySnapshot) => {
        this.Programmering =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.Programmering.push(x);
        });
   
    });
    db.collection('clients')
    .onSnapshot((querySnapshot) => {
        this.Programmering =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.clients.push(x);
        });
   
    });
     db.collection('Redovisning')
    .onSnapshot((querySnapshot) => {
        this.Redovisning =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.Redovisning.push(x);
        });
   
    });
    db.collection('ITSäkerhet')
    .onSnapshot((querySnapshot) => {
        this.ITSäkerhet =[];
        querySnapshot.forEach((doc)=>{
            var x= doc.data()
            x.id=doc.id
            this.ITSäkerhet.push(x);
        });
   
    });

},
methods:{
    deletekey(collection,id){
        db.collection(collection).doc(id).delete().then(function(){
            console.log("document is deleted");
        }).catch(function(error){
            console.error("error removing document" , error);
        })
    }
}
}
</script>

<style>

</style>