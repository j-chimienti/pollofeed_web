<template>
  <div>
    <WebsocketConnectionStatus />
    <BitcoinPayment />
  </div>
</template>

<script>
import BitcoinPayment from "components/BitcoinPayment"
import WebsocketConnectionStatus from "components/WebsocketConnectionStatus"
import { OPEN_WEBSOCKET } from "src/auth/actions"
export default {
  name: "TestPage",
  components: { WebsocketConnectionStatus, BitcoinPayment },
  mounted() {
    this.$store.dispatch(OPEN_WEBSOCKET)
  },
}
</script>

<style scoped></style>
