<template>
  <q-dialog v-model="modals.success.visible">
    <h5>Yummy yummy meal worms!</h5>
    <p class="mb-0">Payment successful!</p>
    <p class="mb-0" v-if="feedToken && feedToken.token">
      Feed token = {{feedToken.token}} -- open the <i class="fa fa-list"></i>
    </p>
  </q-dialog>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "SuccessModal",

  computed: {
    ...mapGetters(['feedTokens', 'modals', 'invoice']),
    feedToken() {
      const invoiceId = this.invoice.id
      return this.feedTokens.find(token => token.orderId == invoiceId)
    },
  }
}
</script>

<style scoped>

</style>
