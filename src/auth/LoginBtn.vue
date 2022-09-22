<template>
<q-btn @click="$store.commit('LOGIN_MODAL_VISIBLE', true)">login</q-btn>
</template>

<script>
  export default {
    name: "LoginBtn"
  }
</script>

<style scoped>

</style>
