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
    <div class="row justify-center items-center q-my-lg">
      <a href="https://spinnie.space" class="column">
        <span class="text-primary">spinnie.space</span>
        <img :src="wheel" alt="spinnie.space" width="100" />
      </a>
    </div>
    <div class="row justify-center q-my-lg">
      <a href="https://bjack.space" class="column">
        <span class="text-primary">bjack.space</span>
        <img :src="blackjack" width="100" alt="bjack.space" />

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
  left: 36px;
  top: 35px;
  z-index: 1000;
  background: #fff6ce;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
}

@media all and (max-width: 1700px) {
  .navbar-v2 {
    width: 200px;
  }
}

@media all and (max-width: 1400px) {
  .navbar-v2 {
    width: 180px;
  }
}

@media all and (max-width: 1200px) {
  .navbar-v2 {
    position: relative;
    margin-top: -50px;
  }
}
</style>
