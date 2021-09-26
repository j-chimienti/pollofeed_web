<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated bordered class="bg-dark">
      <q-toolbar>
        <q-toolbar-title>
          <a href="/">
            <img :src="logo" alt="Feed" width="100%" style="width: 200px">
          </a>
        </q-toolbar-title>
        <btc-usd/>
<!--        TODO: swag page-->
<!--        <router-link class="q-mx-sm" to="/swag">swag</router-link>-->
        <router-link class="q-mx-sm" to="/about">about</router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'
import logo from 'assets/pollofeed_logo.png'
import BtcUsd from "components/BtcUsd";

export default defineComponent({
  name: 'MainLayout',
  components: {BtcUsd},
  data() {
    return { logo}
  }
})
</script>
