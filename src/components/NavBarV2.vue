<template>
  <div class="navbar-v2 text-center">
    <div class="row justify-center">
      <Logo />
    </div>
    <WebsocketConnectionStatus
      style="position: absolute; left: 10px; top: 10px"
    />
    <div class="row">
      <LoginBtn v-if="!authenticated" />
      <LogoutBtn v-else />
    </div>
    <NavLinks class="gt-xs q-my-lg" />
    <div class="row justify-center q-my-lg">
      <SocialShare />
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
        <!--          :src="blackjack"-->
        <img
          src="https://imagedelivery.net/aieSGS-_IR9UJPRPLPtPfw/b593c018-666e-4bd5-78f8-db8aeda67400/public"
          width="100"
          alt="bjack.space"
        />
      </a>
    </div>
  </div>
</template>

<script>
import NavLinks from "components/NavLinks"
import WebsocketConnectionStatus from "components/WebsocketConnectionStatus"
import wheel from "assets/wheel_inner.svg"
import blackjack from "assets/blackjack.png"
import SocialShare from "./social/SocialShare"
import LoginBtn from "../auth/LoginBtn"
import AppMixin from "../mixins/AppMixin"
import LogoutBtn from "../auth/LogoutBtn"
import Logo from "components/Logo"

export default {
  name: "NavBarV2",
  mixins: [AppMixin],
  components: {
    Logo,
    LogoutBtn,
    LoginBtn,
    SocialShare,
    WebsocketConnectionStatus,
    NavLinks,
  },
  data() {
    return { blackjack, wheel }
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
