<template>
<q-page >
  <div class="home">
     <div class="row justify-center">
         <q-card>
           <img
                   id="live_stream"
                   :src="STREAM_URL"
             />
         </q-card>
     </div>
      <div class="row justify-center">
        <PaymentTypes/>
      </div>
  </div>

  <InvoiceModal/>
  <SuccessModal/>
  <Footer/>
</q-page>
</template>

<script>

import InvoiceModal from "../components/InvoiceModal";
import SuccessModal from "../components/SuccessModal";
import FeedSettings from "components/FeedSettings";
import Footer from "components/Footer";
import PaymentTypes from "components/PaymentTypes";

export default {
  name: "Home",
  mounted() {
    const {paid} = this.$route.query
    if (paid) this.$q.notify("Invoice paid ")
  },
  data () { return {
      STREAM_URL: process.env.STREAM_URL,
  }
},
  components: {
    PaymentTypes,
    Footer, FeedSettings, SuccessModal, InvoiceModal},
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


</style>
