<template>
<div>
  <div v-for="alert in alerts" :key="alert.id.toLocaleString()">
    <q-alert show>{{alert.message}}</q-alert>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Alerts",
  computed: {
    ...mapGetters(['alerts'])
  }
}
</script>

<style scoped>

</style>
