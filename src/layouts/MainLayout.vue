<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <NavBarV2 />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue"
import logo from "assets/pollofeed_logo.png"
import NavBarV2 from "components/NavBarV2"

export default defineComponent({
  name: "MainLayout",
  components: { NavBarV2 },
  data() {
    return { logo }
  },
})
</script>

<style>
body {
  background: url(../assets/img/background3.png);
  background-size: cover;
  font-family: "LuckiestGuy";
}
</style>
