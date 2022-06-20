<template>
  <q-page>
    <div class="home">
      <div class="row justify-center q-pa-md">
        <q-card class="card-stream q-pa-md">
          <div class="row justify-center">
            <div class="col" style="max-width: 640px;">
              <q-responsive :ratio="4/3">
              <img
                :src="STREAM_URL"
                alt="live stream"
                id="live_stream"
              />
              </q-responsive>
<!--              <q-img-->
<!--                :src="STREAM_URL"-->
<!--                :ratio="4/3"-->
<!--                id="live_stream"-->
<!--              ></q-img>-->

            </div>
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
  import ActiveButtonV2 from "../components/ActiveButtonV2"
  import AppMixin from "../mixins/AppMixin"
  import SocialShare from "../components/social/SocialShare"

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
      // STREAM_URL: process.env.STREAM_URL,
      STREAM_URL: "https://stream.pollofeed.com",
      // STREAM_URL: "https://via.placeholder.com/640x480.png?text=pollofeed",
      invoiceInterval: null,
    }
  },
  components: {
    SocialShare,
    ActiveButtonV2,
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
    width: 100%;
    margin-top: 0;
  }
}
</style>
