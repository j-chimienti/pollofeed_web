<template>
<q-btn @click="$store.commit('LOGIN_MODAL_VISIBLE', true)">{{loginType}}</q-btn>
</template>

<script>
  import AppMixin from "src/mixins/AppMixin"

  export default {
    name: "LoginBtn",
    mixins: [AppMixin]
  }
</script>

<style scoped>

</style>
