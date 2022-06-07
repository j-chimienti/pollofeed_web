<template>
  <div v-if="pollofeedConfig && pollofeedConfig.id !== null">
    <EditPollofeedConfig v-if="edit" />
    <q-markup-table>
      <caption>
        Configuration for feedings
      </caption>
      <tbody>
        <tr>
          <td>price</td>
          <td>{{ pollofeedConfig.baseFeedPrice.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>Price increase</td>
          <td>{{ pollofeedConfig.applyFeedPriceFactor }}</td>
        </tr>
        <tr>
          <td>Feed time</td>
          <td>{{ pollofeedConfig.feedTime }}</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </q-markup-table>
    <q-btn @click="toggleEdit">edit</q-btn>
  </div>
</template>

<script>
import EditPollofeedConfig from "./EditPollofeedConfig"
import { mapGetters } from "vuex"
export default {
  name: "PollofeedConfig",
  components: { EditPollofeedConfig },
  computed: {
    ...mapGetters(["pollofeedConfig"]),
  },
  data() {
    return { edit: false }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit
    },
  },
}
</script>

<style scoped></style>
