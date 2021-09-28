<template>
  <q-dialog v-model="isVisible" position="top" @hide="CLOSE_INVOICE_MODAL">
    <q-card class="q-pa-md q-pt-lg q-mt-md text-center" style="width: 100%">
     <div class="text-h4">Pay with Lightning</div>
     <div class="row flex justify-between q-my-md">
       <span>
         {{satoshi}} satoshi
          <span v-if="feedPriceUSD">${{feedPriceUSD.toLocaleString()}}</span>
       </span>
       <div>
         <q-icon name="timer"></q-icon>
         <span style="width: 2rem;">{{timeRemaining}}</span>
       </div>
     </div>
     <br/>
     <div class="flex justify-center">
       <a v-bind:href="href" class="bg-white">
         <qrcode-vue
             margin="3"
             :value="payreq"
             :size="250" level="H"/>
       </a>
     </div>
       <q-input class="pointer" readonly id="payreq" v-model="payreq" @click.prevent="copyPaymentRequest"/>
       <q-input v-if="feedToken" class="pointer" readonly id="feedToken" v-model="feedToken"/>
      <div class="row q-my-md">
        <q-btn
            :href="href"
            type="a"
            label="Open in wallet"
            icon="link"
            :loading="loadingInvoice"
        />
        <q-btn v-close-popup="-1" flat color="grey" class="q-ml-auto">Close</q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>


import {mapGetters, mapMutations} from "vuex";
import {isDelayed} from "../services/Ws";
import QrcodeVue from "qrcode.vue";
import {CLOSE_INVOICE_MODAL, OPEN_INVOICE_MODAL} from "src/store/mutations";
const fmtbtc = require('fmtbtc')
const {msat2sat, sat2btc} = fmtbtc
import {copyToClipboard, openURL} from 'quasar'

export default {
  components: {
    QrcodeVue,
  },
  name: "InvoiceModal",
  async mounted() {
    this.updateDurationInterval = this.updateExp()

  },
  unmounted() {
    if (this.updateDurationInterval) clearInterval(this.updateDurationInterval)
  },
  methods: {
    open() {
      openURL(this.href)
    },
    ...mapMutations([CLOSE_INVOICE_MODAL]),
    copyPaymentRequest() {
      copyToClipboard(this.payreq)
      this.$q.notify("Copied invoice")
    },
    updateExp  ()  {
      return setInterval(() => {
        const left = this.timeLeft()
        this.timeRemaining = this.formatDur(left)
        if (left < 0) {
          this.CLOSE_INVOICE_MODAL()
        }
      }, 1000)
    },
    formatDur(x) {
      const h=x/3600|0, m=x%3600/60|0, s=x%60
      return ''+(h>0?h+':':'')+(m<10&&h>0?'0':'')+m+':'+(s<10?'0':'')+s
    },
    timeLeft() { return (this.expiresAt - Date.now()) / 1000 | 0 }
  },

  computed: {
    isVisible: {
      get: function () { return this.modals.invoice.visible },
      set: function(value) {
        return this.$store.commit(value ? OPEN_INVOICE_MODAL : CLOSE_INVOICE_MODAL)
      }
    },
    ...mapGetters(['feedTokens', 'invoice', 'payreq', 'qr', 'btc_usd', 'modals', 'loadingInvoice']),
    feedToken() {
      const invoiceId = isDelayed(this.invoice)
      return this.feedTokens.find(token => token === invoiceId)
    },
    satoshi() { return msat2sat(this.invoice.msatoshi, true) },
    feedPriceUSD() {
      return this.btc_usd && this.invoice.msatoshi ?  (sat2btc(this.satoshi, false) * this.btc_usd).toPrecision(4) : null
    },
    href() { return `lightning:${this.payreq}`.toLowerCase() },
    expiresAt() { return new Date(this.invoice.expires_at).getTime() },

  },
  data() {
    return {
      timeRemaining: null,
      updateDurationInterval: null,
    }
  }
}
</script>

<style scoped>



</style>
