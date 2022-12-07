import {defineStore} from "pinia"
import Swal from 'sweetalert2'
import router from "./router"; 
export const useUserStore = defineStore("userStore" , {
    state : () => {
        return {
            post : [],
            connected : false,
            pseudo :"",
            id : 0,
            image :""
        }
    },
    actions : {
        authentification : async function({email, password}){
            const reponsereq = await fetch(`http://localhost:3400/utilisateurs?email=${email}&password=${password}`)
            const data = await reponsereq.json();
            console.log(data.length)
            if (data.length==1) {
                this.connected=true
                this.pseudo=data[0]['pseudo']
                this.id=data[0]['id']
                this.image=data[0]['urlImgProfil']
                $cookies.set('session_connected', true)
                $cookies.set('session_pseudo', data[0]['pseudo'])
                $cookies.set('session_id', data[0]['id'])
                $cookies.set('session_image', data[0]['urlImgProfil'])
            }
        },
        get_cookie : async function() {
            if ($cookies.isKey('session_id')) {
                var cookies_pseudo = $cookies.get('session_pseudo')
                var cookies_id = $cookies.get('session_id')
                var cookies_image = $cookies.get('session_image')
                this.connected=true
                this.pseudo=cookies_pseudo
                this.id=cookies_id
                this.image=cookies_image
            }
        },
        create : async function({email, password, pseudo, image }){
            if (image=='' ) {
                image = "https://thispersondoesnotexist.com/image"
            }
            const newuser = { id : Date.now() , pseudo : pseudo, email : email, password : password, urlImgProfil : image }
            const options = {
                method : "POST",
                body : JSON.stringify(newuser),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/utilisateurs" , options);
            router.push("Connection")
        },
        mailused : async function({email}){
            const reponsereq = await fetch(`http://localhost:3400/utilisateurs?email=${email}`)
            const data = await reponsereq.json();
            if (data.length==1 && email !="") {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Le mail est déjà utilisé"
                })
                return true
                
            }
            else {
                return false
            }
        },
        pseudoused : async function({pseudo}){
            const reponsereq = await fetch(`http://localhost:3400/utilisateurs?pseudo=${pseudo}`)
            const data = await reponsereq.json();
            if (data.length==1 && pseudo !="") {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Le pseudo est déjà utilisé"
                })
                return true
                
            }
            else {
                return false
            }
        },
        deconnection : async function(){
            this.connected=false
            this.pseudo=""
            this.id=""
            this.image=""
            $cookies.remove('session_connected')
            $cookies.remove('session_pseudo')
            $cookies.remove('session_id')
            $cookies.remove('session_image')
        },
        load_accueil : async function() {
            const reponsereq = await fetch(`http://localhost:3400/articles`)
            const data = await reponsereq.json();
            this.post = data;
            console.log(this.post)
        },
        get : async function(){
            await fetch()
        }
    }
})