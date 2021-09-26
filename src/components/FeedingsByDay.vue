<template>
      <q-table v-if="ordersByDay.length" dark :fields="fields" :items="ordersByDay" style="max-width: 20rem;"></q-table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FeedingsByDay",
  data() { return { fields: [{key: "_id"} , {key: "orders", class: "text-right"}]}},
  computed: {
    ...mapGetters(['ordersByDay'])
  }
}
</script>

<style scoped>

</style>
