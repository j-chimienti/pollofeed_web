<template>
  <div class="flex justify-center align-items-center splash_screen">
    <img :src="logo" width="200px" class="logo rounded-circle" />
  </div>
</template>

<script>
import logo from "assets/img/PF/logo.png"
export default {
  name: "SplashScreen",
  data() {
    return {
      logo,
    }
  },
}
</script>

<style scoped>
.splash_screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
