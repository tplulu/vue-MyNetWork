import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue";
import Inscription from "./components/Inscription.vue";
import Connection from "./components/Connection.vue";


export const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : "/" , name : "Home" , component: Home},
        {path : "/Inscription" , name : "Inscription" , component: Inscription},
        {path : "/Connection" , name : "Connection" , component: Connection}
    ]
})

export default router ;