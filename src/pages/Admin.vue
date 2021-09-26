<template>
<div>
  <SplashScreen v-if="loggingIn"/>
  <div v-else class="container">
    <nav class="navbar mb-4">
      <a @click="LOGOUT" class="nav-link">Logout</a>
      <a :href="deployHost" class="nav-link text-uppercase">home</a>
    </nav>
    <div class="row d-flex justify-content-center align-items-center">
      <Alerts/>
    </div>
    <div>
      <div class="row d-flex justify-content-around mb-4">
        <q-card bg-variant="dark" style="max-width: 25rem;">
          <table>
            <tbody>
            <tr>
              <td>Today Orders</td>
              <td class="text-right text-monospace">
                {{todayOrderCount.toLocaleString()}}
              </td>
            </tr>
            <tr>
              <td>Clients</td>
              <td class="text-right text-monospace">
                <ClientCount/>
              </td>
            </tr>
            <tr>
              <td>Processing Invoices</td>
              <td class="text-right">
                <ProcessingInvoices/>
              </td>
            </tr>
            <tr v-if="totalOrderCount !== null">
              <td>All Orders</td>
              <td class="text-right text-monospace">{{totalOrderCount.toLocaleString()}}</td>
            </tr>
            </tbody>
          </table>
        </q-card>
        <q-card bg-variant="dark" style="max-width: 20rem;">
          <PollofeedConfig/>
        </q-card>
      </div>
      <div class="row d-flex justify-content-around">
        <div>
          <h3>Feedings</h3>
          <FeedingList/>
        </div>
        <div>
          <h3>Feedings By Day</h3>
          <FeedingsByDay/>
        </div>
      </div>
      <h3>Invoices</h3>
      <h3>Merch sales</h3>
      <SwagInvoices/>
    </div>
  </div>
</div>
</template>

<script>

import {deployHost} from '@/constants';
import SwagInvoices from "components/SwagInvoices";
import FeedingList from "components/FeedingList";
import ClientCount from "components/ClientCount";
import ProcessingInvoices from "components/ProcessingInvoices";
import PollofeedConfig from "components/PollofeedConfig";
import FeedingsByDay from "components/FeedingsByDay";
import {mapActions, mapGetters} from "vuex";
import Alerts from "components/Alerts";
import SplashScreen from "components/SplashScreen";

export default {
  name: "Admin",
  data() { return {deployHost }},
  computed: {
    ...mapGetters(['totalOrderCount', 'todayOrderCount', 'isLoggedIn', 'loggingIn']),
  },
  components: {
    SplashScreen,
    Alerts,
    FeedingsByDay,
    PollofeedConfig,
    ProcessingInvoices, ClientCount, FeedingList, SwagInvoices
  },
  methods: {
    ...mapActions(['LOGOUT']),
  }
}
</script>

<style scoped>

</style>
