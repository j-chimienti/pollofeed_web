<template>
<q-btn
  @click="$store.dispatch('LOGOUT')">

  <q-avatar>
    <q-img v-if="picture" :src="picture"/>
  </q-avatar>
    <span >logout</span>
</q-btn>
</template>

<script>
  import AppMixin from "../mixins/AppMixin"

  export default {
    name: "LogoutBtn",
    mixins: [AppMixin],

  }
</script>

<style scoped>

</style>
