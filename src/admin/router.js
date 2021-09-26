import VueRouter from "vue-router";
import Vue from 'vue'
import SplashScreen from "@/components/SplashScreen";

const ADMIN = () => import("@/pages/Admin")

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {path: '/login', component: () => import("@/pages/LoginPage"), name: "login" },
    {path: "/swagInvoice/:id", component: () => import("@/pages/SwagInvoice"), name: "swagInvoice" },
    {path: "/invoices/:id", component: () => import("@/pages/InvoicePage"), name: "invoice" },
    { path: '/splash', component: SplashScreen, name: "splash" },
    {path: "/", component: ADMIN },
  ],
  // mode: "history"
  mode: "hash"
})
