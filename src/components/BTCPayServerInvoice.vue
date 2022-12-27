<template>
  <div>
    <div class="text-h3">
      {{ btcPayServerInvoice.status }}
    </div>
    <iframe :src="btcPayServerInvoice?.url"></iframe>
    <div>
      <q-btn label="clear" @click="clearBtc" />
    </div>
  </div>
</template>

<script>
import AppMixin from "src/mixins/AppMixin"

export default {
  name: "BTCPayServerInvoice",
  mixins: [AppMixin],
  methods: {
    clearBtc() {
      this.$store.commit("btcInvoice", null)
    },
  },
}
</script>

<style scoped></style>
