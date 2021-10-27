<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'
import logo from 'assets/pollofeed_logo.png'
import NavBar from "components/NavBar";

export default defineComponent({
  name: 'MainLayout',
  components: {NavBar},
  data() {
    return { logo}
  }
})
</script>
