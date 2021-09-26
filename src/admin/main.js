import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "../style.css"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import AppAdmin from "@/admin/AppAdmin";
import {store} from "@/admin/store/store";
import {router} from "@/admin/router";
// eslint-disable-next-line no-unused-vars
const $ = require('jquery') , _ = require('bootstrap')

// const LOGIN = () => import("@/components/Login")


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

export const app = new Vue({
  render: h => h(AppAdmin),
  store,
  router,
  el: "#app",
})
// .$mount('#app')
