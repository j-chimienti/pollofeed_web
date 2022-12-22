<template>
  <div>
    <WebsocketConnectionStatus />
    <BitcoinPayment />
  </div>
</template>

<script>
import BitcoinPayment from "components/BitcoinPayment"
import WebsocketConnectionStatus from "components/WebsocketConnectionStatus"
export default {
  name: "TestPage",
  components: { WebsocketConnectionStatus, BitcoinPayment },
}
</script>

<style scoped></style>
