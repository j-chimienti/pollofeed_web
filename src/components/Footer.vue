<template>
  <footer>
    <div class="row flex flex-center">
      <a href="https://spinnie.space" class="q-mr-md">
        <img :src="wheel" alt="spin" width="100" />
      </a>
      <a></a>
      <a href="https://blakjak.app">
        <img :src="blackjack" width="100" alt="blackjack" />
      </a>
    </div>
  </footer>
</template>

<script>
import wheel from "assets/wheel_inner.svg"
import blackjack from "assets/blackjack.png"
import NavLinks from "components/NavLinks"
import { mapGetters } from "vuex"

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["invoice", "connectedToWebsocket", "websocket"]),
  },
  components: { NavLinks },
  data() {
    return { wheel, blackjack }
  },
}
</script>

<style scoped>
img {
  transition: transform 0.7s ease-in-out;
}
img:hover {
  transform: rotate(360deg);
}
</style>
