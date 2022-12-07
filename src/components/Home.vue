<script setup>
import { RouterLink } from "vue-router"
import { useUserStore } from "../userStore"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import router from "../router"; 
let userStore = useUserStore() ;
</script>
<template>
    Home
    <div class="row" v-for="todo , index in userStore.post" :key="index">
        <div class="card">
            <div class="card-header">
                {{ todo.pseudo }}
                {{get_image_profil(todo.pseudo)}}
            </div>
            <div class="card-body">    
                <div> <img :src="todo.urlImgArticle" style="max-width: 100%;" alt=""> </div>
                {{ todo.contenu }}
            </div>
        </div>
    </div>
</template>


<script>
    
    import {useUserStore} from "../userStore"

    export default {
        methods : {
            get_image_profil : async function({pseudo}){
                const reponsereq = await fetch(`http://localhost:3400/utilisateurs?pseudo=${pseudo}`)
                const data = await reponsereq.json();
                if (data.length==1) {
                   console.log(data[0]['urlImgProfil'])
                   return data[0]['urlImgProfil']
                }
            }
        },
        beforeMount(){

        },
        created: function () {
            
        },
        data : () => {
            return {
                email : "",
                password : "",
                userStore : useUserStore()
            }
        }
    }
</script>