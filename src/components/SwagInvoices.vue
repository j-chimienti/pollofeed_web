<template>
  <q-markup-table v-if="INVOICES.length">
    <thead>
      <tr>
        <th></th>
        <th class="text-right">Time</th>
        <th>Name</th>
        <th>Status</th>
        <th>Shipped</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in sortedInvoices()" :key="invoice.id">
        <td>
          <router-link
            :to="{ name: 'merch', params: { id: invoice.id } }"
            class="nav-link"
            >{{ invoice.id.slice(0, 4) }}</router-link
          >
        </td>
        <td class="text-right text-monospace fmt_local_date">
          {{ invoice.createdAt.toLocaleString() }}
        </td>
        <td>{{ invoice.buyer.name }}</td>
        <td>
          <div
            class="badge rounded"
            :class="{
              'badge-success':
                invoice.status === 'complete' || invoice.status === 'confirmed',
              'badge-default': invoice.status === 'new',
            }"
          >
            {{ invoice.status }}
          </div>
        </td>
        <td class="text-center">
          <i
            v-if="invoice.sentShippingEmail"
            class="fa fa-circle text-success"
          ></i>
          <i v-else class="fa fa-circle text-danger"></i>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <h4>Total</h4>
        </td>
        <td colspan="4" class="text-right font-weight-bold text-monospace">
          <h4>{{ sum.toLocaleString() }}</h4>
        </td>
      </tr>
    </tfoot>
  </q-markup-table>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "SwagInvoices",
  computed: {
    ...mapGetters(["swagInvoices"]),
    INVOICES() {
      return (
        this.swagInvoices
          // .filter(i => ['complete', 'confirmed'].includes(i.status))
          .map((i) => ({
            ...i,
            createdAt: new Date(i.createdAt),
          }))
      )
    },
    sum() {
      return this.INVOICES.map((i) =>
        i.items.map((it) => it.price).reduce((a, b) => a + b, 0)
      ).reduce((a, b) => a + b, 0)
    },
  },
  methods: {
    sortedInvoices() {
      return this.INVOICES.sort((a, b) => b.createdAt - a.createdAt)
    },
  },
}
</script>

<style scoped></style>
