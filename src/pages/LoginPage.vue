<template>
<div>
<SplashScreen v-if="loggingIn"/>
  <Login v-else/>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import SplashScreen from "components/SplashScreen";
import Login from "components/Login";

export default {
  name: "LoginPage",
  components: {Login, SplashScreen},
  computed: {
    ...mapGetters(['loggingIn', 'loginError'])
  }
}
</script>

<style scoped>

</style>
