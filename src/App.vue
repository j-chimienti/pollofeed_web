<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import {GET_INVOICE, OPEN_WEBSOCKET} from "src/store/actions";
import {mapActions, mapGetters} from "vuex";

const INVOICE_INTERVAL = 5000; /// 5 seconds
export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions([OPEN_WEBSOCKET, GET_INVOICE])
  },
  data() {
    return { invoiceInterval: null }
  },
  computed: {
    ...mapGetters(['invoice', 'connectedToWebsocket', 'websocket'])
  },
  mounted() {
    this.$q.dark.set(true)
    this.$store.dispatch(OPEN_WEBSOCKET)
    this.invoiceInterval = setInterval(() => {
      if (this.invoice) this.GET_INVOICE(this.invoice)
    }, INVOICE_INTERVAL)
  },
  unmounted() {
    clearInterval(this.invoiceInterval)
  }
})
</script>
