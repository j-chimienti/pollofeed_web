
import VueSocialSharing from 'vue-social-sharing'
import { boot } from "quasar/wrappers"
import QrcodeVue from "qrcode.vue"

export default boot(({ app }) => {
  app.use(VueSocialSharing);
  app.component("qrcode-vue", QrcodeVue)

})
