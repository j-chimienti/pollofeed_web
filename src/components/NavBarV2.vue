<template>
  <div class="navbar-v2 text-center">
    <router-link :to="{ name: 'home' }">
      <img :src="logo" alt="Feed" width="200" />
    </router-link>
    <WebsocketConnectionStatus />
    <br />
    <br />
    <br />
    <NavLinks class="gt-xs" />
    <br />
    <br />
    <br />
    <a href="https://lightningchance.com" class="q-mr-md">
      <img :src="wheel" alt="spin" width="100" />
    </a>
    <br />
    <a href="https://btcblackjack.org">
      <img :src="blackjack" width="100" alt="blackjack" />
    </a>
    <!--    todo: center bottom align-->
    <div style="position: absolute; bottom: 10px; left: 15%">
      <SocialShareButtons />
    </div>
  </div>
</template>

<script>
import logo from "../assets/img/logo.svg"
import BtcUsd from "components/BtcUsd"
import NavLinks from "components/NavLinks"
import WebsocketConnectionStatus from "components/WebsocketConnectionStatus"
import SocialShareButtons from "./social/SocialShareButtons"
import wheel from "assets/wheel_inner.svg"
import blackjack from "assets/blackjack.png"
export default {
  name: "NavBarV2",
  components: {
    SocialShareButtons,
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
</style>
