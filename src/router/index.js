import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
    // path: "/login"  indicaa a rota do back end
    // name: "Login", é  o nome da pagina
    // component: () => import("../views/Login.vue")  é a rota do vue onde criamos a pagina.
    
  },

  {
    path: "/moradores",
    name: "Morador",
    component: () => import("../views/Morador.vue")
  },

  {
    path: "/moradorap/:app",
    name: "Moradorap",
    component: () => import("../views/Morador_busca_ap.vue"),
    props: true
  },

  {
    path: "/moradorrg/:rgp",
    name: "Moradorrg",
    component: () => import("../views/Morador_busca_rg.vue"),
    props: true
  },
    
  {
    path: "/moradornovo",
    name: "Morador_novo",
    component: () => import("../views/Morador_novo.vue")
  },

  {
    path: "/moradoreditar/:morador",
    name: "Morador_editar",
    component: () => import("../views/Morador_editar.vue"),
    props: true
  }

];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
