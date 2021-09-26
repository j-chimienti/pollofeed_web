<template>
<SplashScreen v-if="!(ordersView.length)"/>
  <p v-else-if="!invoice">Not found</p>
  <div v-else class="container m-3">
    <div class="my-2">
      <router-link to="/">home</router-link>
    </div>

    <q-card bg-variant="dark">
      <q-card-body>
        <p :class="{'text-success': invoice.status === 'paid' }">Status: {{invoice.status}}</p>
        <p>Id: {{invoice.id}}</p>
        <p>Paid At: {{invoice.paid_at.toLocaleString()}}</p>
      </q-card-body>
    </q-card>
    <q-card>
      <q-card-body>
        <pre>
          {{JSON.stringify(invoice, null, 4)}}
        </pre>
      </q-card-body>
    </q-card>
  </div>
</template>

<script>
import SplashScreen from "components/SplashScreen";
import {mapGetters} from "vuex";

export default {
  name: "InvoicePage",
  components: { SplashScreen},
  computed: {
    ...mapGetters(['ordersView']),
    orderId() { return this.$route.params.id },
    invoice() { return this.ordersView.find(o => o.id === this.orderId)}
  }
}
</script>

<style scoped>

</style>
