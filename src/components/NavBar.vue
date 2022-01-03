<template>
  <q-header elevated bordered class="bg-dark">
    <q-toolbar class="q-my-md flex justify-around">
      <router-link :to="{name: 'home'}">
        <img :src="logo" alt="Feed" width="200">
      </router-link>
      <NavLinks class="gt-xs"/>
    </q-toolbar>
  </q-header>
</template>

<script>
import logo from 'assets/pollofeed_logo.png'
import BtcUsd from "components/BtcUsd";
import NavLinks from "components/NavLinks";
export default {
  name: "NavBar",
  components: {NavLinks, BtcUsd},
  data() {
    return { logo}
  }
}
</script>

<style scoped>

</style>
