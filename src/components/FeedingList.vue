<template>
<div class=" q-mb-4">
      <q-markup-table>
        <thead>
        <tr class="text-capitalize">
          <th>id</th>
          <th class="text-right">date</th>
          <th class="text-right">status</th>
          <th class="text-right">sats</th>
          <th>order feed</th>
          <th>order delay</th>
          <th>order token</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in data"  :key="order.id" :class="{'text-muted': order.status === 'expired'}">
          <td>
              {{ order.id.slice(0, 8) }}
          </td>
          <td class="text-right">{{order.created_at_time.toLocaleString()}}</td>
          <td
          >
            {{ order.status }}
          </td>
          <td class="text-right">{{ (order.msatoshi / 1000).toLocaleString() }}</td>
          <td v-if="order.hasOrder">
            <div class="badge rounded" :class="{'badge-success': !order.order.feed, 'badge-danger': order.order.feed}">
              {{order.order.feed}}
            </div>
          </td>
          <td v-else>--</td>
          <td  class="text-right">
              {{order.hasOrder ? (order.acknowledged_at - order.paid_at).toLocaleString() : "--"}}

          </td>
          <td>{{order.hasOrder ? order.feedToken : "--"}}</td>
        </tr>
        </tbody>
      </q-markup-table>
</div>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "FeedingList",
  computed: {
    ...mapGetters(['ordersView']),
    data() {
      if (!this.ordersView) return []
      return this.ordersView.map(o => { return {...o, created_at_time: new Date(o.created_at)} })
    }
  },
  methods: {
    paidAt(order) {
      try {
        return order.paid_at
      } catch (e) {
        return "NA"
      }
    },
    isDelayed(order) {
      try {
        return order.order.metadata.feedToken
      } catch (e) {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>
