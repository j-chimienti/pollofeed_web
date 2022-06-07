<template>
  <div>
    {{ clientCount }}
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "ClientCount",
  computed: {
    ...mapGetters(["clientCount"]),
  },
}
</script>

<style scoped></style>
