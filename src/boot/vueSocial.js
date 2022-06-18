
import VueSocialSharing from 'vue-social-sharing'
import { boot } from "quasar/wrappers"


export default boot(({ app }) => {

  app.use(VueSocialSharing);

})
