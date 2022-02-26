<template>
  <q-header elevated bordered class="bg-dark">
    <q-toolbar class="flex justify-around">
      <router-link :to="{name: 'home'}">
        <img :src="logo" alt="Feed" width="200">
        <WebsocketConnectionStatus/>
      </router-link>
      <NavLinks class="gt-xs"/>
    </q-toolbar>
  </q-header>
</template>

<script>
import logo from 'assets/pollofeed_logo.png'
import BtcUsd from "components/BtcUsd";
import NavLinks from "components/NavLinks";
import WebsocketConnectionStatus from "components/WebsocketConnectionStatus";

const isDev = process.env.NODE_ENV === 'development'
export default {
  name: "NavBar",
  components: {WebsocketConnectionStatus, NavLinks, BtcUsd},
  data() {
    return { logo, isDev}
  }
}
</script>

<style scoped>

</style>
