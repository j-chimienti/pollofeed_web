import { store } from "quasar/wrappers"
import { createStore } from "vuex"
import { pollofeedModule } from "src/store/pollofeedModule"
import { invoiceModule } from "src/store/bitcoin.invoices.module"
import { wsModule } from "src/store/ws.module"

import authModule from "src/auth/auth.module"

 // import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      pollofeed: pollofeedModule,
      invoices: invoiceModule,
      ws: wsModule,
      auth: authModule,
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  })

  return Store
})
