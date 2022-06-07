<template>
  <q-page>
    <div class="home">
      <div class="row justify-center">
        <q-card class="card-stream">
          <div class="row justify-center">
            <img
              style="border: 0.375rem solid #8e1116; border-radius: 1rem"
              id="live_stream"
              :src="STREAM_URL"
            />
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
    const { paid } = this.$route.query
    if (paid) this.$q.notify("Invoice paid")

    const j = ""

    this.invoiceInterval = setInterval(() => {
      this.checkInvoice()
    }, 5000)
    this.checkInvoice()
  },
  data() {
    return {
      STREAM_URL: process.env.STREAM_URL,
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
  height: 483px;
  width: 643px;
  border: 3px solid transparent;
}

.card-stream {
  width: 800px;
  height: 934px;
  background: #fff6ce;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
  margin-top: 50px;
  padding-top: 2.625rem;
  overflow-y: scroll;
  /*border: 15px solid #8E1116;*/
  /*border-image-source: linear-gradient(116.32deg, #800C10 -18.47%, rgba(250, 78, 85, 0.85) 17.04%, #EFDE3B 50.33%, rgba(222, 56, 62, 0.85) 94.72%, #800C10 122.09%);*/
}

@media all and (max-width: 1000px) {
  .card-stream {
    width: 90vw;
    min-width: 700px;
  }
}
</style>
