<template>
  <q-card class="col-12" style="max-width: 600px">
    <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        @update:model-value="saveToLocalStorage"
    >
      <q-tab name="INVOICE" label="INVOICE" />
      <q-tab name="LNURL" label="LNURL" />
      <q-tab name="OFFER" label="OFFER" />
      <q-tab name="LNADDR" label="LNADDR" />
      <q-tab name="DELAYED" label="DELAYED" />
    </q-tabs>

    <q-separator />
  <q-tab-panels v-model="tab" animated style="height: 400px;" class="text-center">
    <q-tab-panel name="INVOICE">
      <q-btn size="lg" push color="primary"  @click.prevent="INVOICE(delayFeeding)"
      >
        <span>feed</span>
      </q-btn>
      <div class="q-gutter-sm">
      <q-checkbox
          label="I want to delay feeding"
          v-model="delayFeeding"
          name="delayFeeding"
          value="delayed"
          unchecked-value="not_delayed"
      />
      </div>
    </q-tab-panel>
    <q-tab-panel  name="LNURL">
      <LightningUrl/>
    </q-tab-panel>
    <q-tab-panel  name="OFFER">
      <offer/>
    </q-tab-panel>
    <q-tab-panel  name="LNADDR">
      <LightningAddress/>
    </q-tab-panel>
    <q-tab-panel name="DELAYED">
      <DelayFeeding/>
    </q-tab-panel>

  </q-tab-panels>
  </q-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {SET_DELAYED_FEEDING} from "../store/mutations";
import {INVOICE} from "../store/actions";
import Offer from "components/Offer";
import LightningUrl from "components/LightningUrl";
import LightningAddress from "components/LightningAddress";
import DelayFeeding from "components/DelayFeeding";
const KEY = "PAYMENT_TYPE"
export default {
  name: "PaymentTypes",
  // eslint-disable-next-line vue/no-unused-components
  components: {DelayFeeding, LightningAddress, LightningUrl, Offer},
  data()  {
    const tab = localStorage.getItem(KEY) || "INVOICE"
    return {
      tab,
      delayFeeding: false
    }
  },
  computed: {
    ...mapGetters(['buttonDisabled', 'loadingInvoice']),
  },
  methods: {
    saveToLocalStorage(e) {
      localStorage.setItem(KEY, e)
    },
    ...mapActions([INVOICE]),
    ...mapMutations([SET_DELAYED_FEEDING])
  }
}
</script>

<style scoped>

</style>
