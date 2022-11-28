<template>
  <router-link :to="{ name: 'home' }">
    <q-img :src="logo" :width="imgWidth" />
  </router-link>
</template>
<script>
import logo from "../assets/img/logo.svg"

export default {
  name: "Logo",
  props: {
    imgWidth: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return { logo }
  },
}
</script>
<style scoped></style>
