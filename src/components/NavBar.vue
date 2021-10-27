<template>
  <q-header elevated bordered class="bg-dark">
    <q-toolbar class="q-my-md flex justify-between">
      <router-link to="/">
        <img :src="logo" alt="Feed" width="200">
      </router-link>
      <div>
        <btc-usd/>
        <q-btn class="q-mx-md" type="a" :to="{name: 'about'}">about</q-btn>
        <q-btn class="q-mx-md" type="a" :to="{name: 'swag'}">swag</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import logo from 'assets/pollofeed_logo.png'
import BtcUsd from "components/BtcUsd";
export default {
  name: "NavBar",
  components: {BtcUsd},
  data() {
    return { logo}
  }
}
</script>

<style scoped>

</style>
