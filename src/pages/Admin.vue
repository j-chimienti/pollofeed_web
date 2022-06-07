<template>
  <q-page>
    <div class="row q-my-md">
      <q-btn type="a" @click="LOGOUT">Logout</q-btn>
      <q-btn type="a" :href="deployHost">home</q-btn>
    </div>
    <q-card bg-variant="dark" style="max-width: 25rem">
      <table>
        <tbody>
          <tr>
            <td>Today Orders</td>
            <td class="text-right text-monospace" v-if="todayOrderCount">
              {{ todayOrderCount.toLocaleString() }}
            </td>
          </tr>
          <tr>
            <td>Clients</td>
            <td class="text-right text-monospace">
              <ClientCount />
            </td>
          </tr>
          <tr>
            <td>Processing Invoices</td>
            <td class="text-right">
              <ProcessingInvoices />
            </td>
          </tr>
          <tr v-if="totalOrderCount !== null">
            <td>All Orders</td>
            <td class="text-right text-monospace">
              {{ totalOrderCount.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </q-card>
    <q-card bg-variant="dark" style="max-width: 20rem">
      <PollofeedConfig />
    </q-card>
    <h3>Feedings</h3>
    <FeedingList />
    <h3>Feedings By Day</h3>
    <FeedingsByDay />
    <SwagInvoices />
  </q-page>
</template>

<script>
import SwagInvoices from "components/SwagInvoices"
import FeedingList from "components/FeedingList"
import ClientCount from "components/ClientCount"
import ProcessingInvoices from "components/ProcessingInvoices"
import PollofeedConfig from "components/PollofeedConfig"
import FeedingsByDay from "components/FeedingsByDay"
import { mapActions, mapGetters } from "vuex"
import SplashScreen from "components/SplashScreen"
import { LOGOUT, RESUME_SESSION } from "src/store/actions"

export default {
  name: "Admin",
  data() {
    return { deployHost: process.env.VUE_APP_DEPLOY_HOST }
  },
  mounted() {
    if (!this.authenticated) this.$router.push({ name: "login" })
    else this.RESUME_SESSION()
  },
  computed: {
    ...mapGetters(["totalOrderCount", "todayOrderCount", "authenticated"]),
  },
  components: {
    SplashScreen,
    FeedingsByDay,
    PollofeedConfig,
    ProcessingInvoices,
    ClientCount,
    FeedingList,
    SwagInvoices,
  },
  methods: {
    ...mapActions([LOGOUT, RESUME_SESSION]),
  },
}
</script>

<style scoped></style>
