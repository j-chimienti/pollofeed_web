<template>
  <div>
    <Logo img-width="65px" />
    <LoginBtn v-if="!authenticated" />
    <LogoutBtn v-else />
  </div>
</template>

<script>
import LoginBtn from "src/auth/LoginBtn"
import LogoutBtn from "src/auth/LogoutBtn"
import AppMixin from "src/mixins/AppMixin"
import Logo from "components/Logo"
export default {
  name: "MobileBottomNav",
  mixins: [AppMixin],
  components: { Logo, LogoutBtn, LoginBtn },
}
</script>

<style scoped></style>
