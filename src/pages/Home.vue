<template>
  <q-page>
    <div class="home">
      <div class="row justify-center q-pa-md">
        <q-card class="card-stream q-pa-md">
          <div class="row justify-center">
            <iframe
              :src="STREAM_URL"
              frameborder="0"
              width="640"
              height="480"
              id="live_stream"
            ></iframe>
          </div>
          <PaymentTypes />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import InvoiceModal from "../components/InvoiceModal"
import FeedSettings from "components/FeedSettings"
import Footer from "components/Footer"
import PaymentTypes from "components/PaymentTypes"
import NavBarV2 from "../components/NavBarV2"
import ActiveButtonV2 from "../components/ActiveButtonV2"
import AppMixin from "../mixins/AppMixin"

export default {
  name: "Home",
  mixins: [AppMixin],
  methods: {
    checkInvoice() {
      if (this.invoiceUnpaid) this.GET_INVOICE()
    },
  },

  mounted() {
    const { paid, token } = this.$route.query
    if (paid) this.$q.notify("Invoice paid")

    if (token) {
      this.SET_INVOICE(null)
      this.SET_DELAYED_FEEDING(token)
      this.SET_USE_TOKEN_NOW(token)
    }

    this.invoiceInterval = setInterval(() => {
      this.checkInvoice()
    }, 5000)
    this.checkInvoice()
  },
  unmounted() {
    if (this.invoiceInterval) clearInterval(this.invoiceInterval)
  },
  data() {
    return {
      STREAM_URL: process.env.STREAM_URL,
      // STREAM_URL: "https://stream.pollofeed.com",
      // STREAM_URL: "https://www.youtube.com/embed/k3_tw44QsZQ?rel=0",
      invoiceInterval: null,
    }
  },
  components: {
    ActiveButtonV2,
    NavBarV2,
    PaymentTypes,
    Footer,
    FeedSettings,
    InvoiceModal,
  },
}
</script>

<style scoped>
.home {
  min-height: 80vh;
}

#live_stream {
  border: 0.375rem solid #8e1116;
  border-radius: 1rem;
}

.card-stream {
  width: 800px;
  /*height: 934px;*/
  background: #fff6ce;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
  margin-top: 50px;
  /*padding-left: 40px;*/
  /*padding-right: 40px;*/
  padding-top: 2.625rem;

  /*border-top: 15px solid;*/
  /*border-image-source: linear-gradient(116.32deg, #800C10 -18.47%, rgba(250, 78, 85, 0.85) 17.04%, #EFDE3B 50.33%, rgba(222, 56, 62, 0.85) 94.72%, #800C10 122.09%);*/

  /*border: 15px solid #8E1116;*/
  /*border-image-source: linear-gradient(116.32deg, #800C10 -18.47%, rgba(250, 78, 85, 0.85) 17.04%, #EFDE3B 50.33%, rgba(222, 56, 62, 0.85) 94.72%, #800C10 122.09%);*/
}

@media all and (max-width: 1000px) {
  .card-stream {
    width: 90vw;
    min-width: 700px;
    margin-top: 0;
  }
}
</style>
