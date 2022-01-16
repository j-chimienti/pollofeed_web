import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import {swagModule} from './swag.module'
import adminModule from './admin.module'
import {pollofeedModule} from "src/store/pollofeedModule";
import {invoiceModule} from "src/store/bitcoin.invoices.module";
import {wsModule} from "src/store/ws.module";
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
      merch: swagModule,
      pollofeed: pollofeedModule,
      admin: adminModule,
      invoices: invoiceModule,
      ws: wsModule,
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
