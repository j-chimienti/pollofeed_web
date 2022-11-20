<template>
  <router-link :to="{ name: 'home' }">
    <img :src="logo" alt="Feed" :width="width" />
  </router-link>
</template>
<script>
import logo from "../assets/img/logo.svg"

export default {
  name: "Logo",
  props: {
    width: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return { logo }
  },
}
</script>
<style scoped>
@media all and (max-width: 1700px) {
}

@media all and (max-width: 1400px) {
}

@media all and (max-width: 1200px) {
}
</style>
