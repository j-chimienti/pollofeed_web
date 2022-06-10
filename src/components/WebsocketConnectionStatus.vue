<template>
  <q-icon
    name="check_circle"
    :class="{
      'text-green': connectedToWebsocket,
      'text-red': !connectedToWebsocket,
    }"
  />
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "WebsocketConnectionStatus",
  computed: {
    ...mapGetters(["connectedToWebsocket"]),
  },
}
</script>

<style scoped></style>
