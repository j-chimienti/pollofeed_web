<template>
  <div v-if="processingInvoices !== null">{{ processingInvoices.length }}</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "ProcessingInvoices",
  computed: {
    ...mapGetters(["processingInvoices"]),
  },
}
</script>

<style scoped></style>
