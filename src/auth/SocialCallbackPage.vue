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
    const params = window.location.search
    if (params.includes("code=") && params.includes("state=")) {
      this.OAUTH_AUTHORIZE_CALLBACK(params)
    } else {
      alert("cannot push")
      this.$router.push({name: "home"})
    }
  },
}
</script>

<style scoped></style>
