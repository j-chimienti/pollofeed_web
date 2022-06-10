<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue"
import { OPEN_WEBSOCKET } from "src/store/actions"

export default defineComponent({
  name: "App",
  mounted() {
    this.$store.dispatch(OPEN_WEBSOCKET)
  },
})
</script>
