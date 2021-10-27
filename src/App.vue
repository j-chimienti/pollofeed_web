<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import {OPEN_WEBSOCKET} from "src/store/actions";

export default defineComponent({
  name: 'App',
  mounted() {
    // set status
    this.$q.dark.set(true) // or false or "auto"
    this.$store.dispatch(OPEN_WEBSOCKET, false)
  }
})
</script>
