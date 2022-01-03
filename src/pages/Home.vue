<template>
<q-page >
  <div class="home">
     <div class="row justify-center q-ma-md q-pa-md">
         <q-card>
           <iframe class="rounded shadow"
                   id="live_stream"
                   src="https://stream.pollofeed.com"
             ></iframe>
         </q-card>
     </div>
      <div class="row q-ma-md justify-center">
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
  max-height: 50vh;
  max-width: 90vw;
}


</style>
