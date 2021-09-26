<template>
  <nav class="d-flex justify-content-around align-items-center my-3">
    <router-link class="text-capitalize" to="/swag">swag</router-link>
        <img src="assets/img/PF/pollofeed_logo.png" alt="Feed" width="100%" style="max-width: 250px" class="qrcode-img">
    <router-link class="text-capitalize" to="/about">about</router-link>
  </nav>
</template>

<script>

export default {
  name: "NavBar",
}
</script>

<style scoped>

</style>
