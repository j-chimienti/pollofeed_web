import VueSocialSharing from "vue-social-sharing"
import { boot } from "quasar/wrappers"
import QrcodeVue from "qrcode.vue"

import vueQr from "vue-qr/src/packages/vue-qr.vue"
export default boot(({ app }) => {
  app.use(VueSocialSharing)
  app.component("qrcode-vue", QrcodeVue)
  app.component("vue-qr", vueQr)
})
