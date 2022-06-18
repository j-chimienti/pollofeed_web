<template>
  <div class="navbar-v2 text-center">
    <div class="row justify-center">
      <router-link :to="{ name: 'home' }">
        <img :src="logo" alt="Feed" width="200" />
      </router-link>
    </div>
    <WebsocketConnectionStatus
      style="position: absolute; left: 10px; top: 10px"
    />
    <NavLinks class="gt-xs q-my-lg" />
    <div class="row justify-center q-my-lg">
      <SocialShare/>
    </div>
    <div class="row justify-center q-my-lg">
      <a href="https://lightningchance.com" class="q-mr-md">
        <img :src="wheel" alt="spin" width="100" />
      </a>
      <a href="https://btcblackjack.org">
        <img :src="blackjack" width="100" alt="blackjack" />
      </a>
    </div>
  </div>
</template>

<script>
  import logo from "../assets/img/logo.svg"
  import BtcUsd from "components/BtcUsd"
  import NavLinks from "components/NavLinks"
  import WebsocketConnectionStatus from "components/WebsocketConnectionStatus"
  import wheel from "assets/wheel_inner.svg"
  import blackjack from "assets/blackjack.png"
  import SocialShare from "./social/SocialShare"

  export default {
  name: "NavBarV2",
  components: {
    SocialShare,
    WebsocketConnectionStatus,
    NavLinks,
    BtcUsd,
  },
  data() {
    return { logo, blackjack, wheel }
  },
}
</script>

<style scoped>
.navbar-v2 {
  position: absolute;
  width: 303px;
  height: 100%;
  max-height: 1100px;
  left: 36px;
  top: 35px;

  z-index: 1000;
  background: #fff6ce;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
}

@media all and (max-width: 500px) {
  .navbar-v2 {
    left: 0px;
    bottom: 35px;
    width: 100%;
    position: relative;
  }
}
</style>
