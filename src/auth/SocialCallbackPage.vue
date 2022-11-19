<template>
  <SplashScreen />
</template>

<script>
import SplashScreen from "../components/SplashScreen"
import { mapActions } from "vuex"
import { OAUTH_AUTHORIZE_CALLBACK } from "./actions"

export default {
  name: "SocialCallbackPage",
  components: { SplashScreen },
  methods: {
    ...mapActions([OAUTH_AUTHORIZE_CALLBACK]),
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("code") && urlParams.has("state")) {
      this.OAUTH_AUTHORIZE_CALLBACK({
        code: urlParams.get("code"),
        state: urlParams.get("state"),
      })
    } else {
      this.$router.push({ name: "home" })
    }
  },
}
</script>

<style scoped></style>
