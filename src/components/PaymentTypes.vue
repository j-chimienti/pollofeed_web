<template>
  <div>
  <q-tab-panels v-model="tab" animated style="min-height: 400px; min-width: 200px; max-width: 600px;" class="text-center">
    <q-tab-panel name="INVOICE">
      <q-btn
          data-cy="invoice_button"
          size="lg"
          push
          evelated
          color="primary"
          @click.prevent="invoiceRequest()"
          label="Create invoice"
          :disable="invoiceBtnDisabled"
      />
      <div class="q-gutter-sm q-my-md">
        <q-checkbox
            label="I want to delay feeding"
            v-model="delayFeeding"
            data-cy="delayed-order-selector"
            name="delayFeeding"
            value="delayed"
            unchecked-value="not_delayed"
        >
          <q-tooltip>
            Pay now and feed later
          </q-tooltip>
        </q-checkbox>
      </div>
    </q-tab-panel>
    <q-tab-panel  name="OFFER"><offer/></q-tab-panel>
    <q-tab-panel  name="LNURL"><LightningUrl/></q-tab-panel>
    <q-tab-panel  name="LNADDR"><LightningAddress/></q-tab-panel>
    <q-tab-panel name="DELAYED"><DelayFeeding/></q-tab-panel>

  </q-tab-panels>
  <q-footer bordered class="bg-dark text-primary">
    <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        style="height: 50px;"
    >
      <q-tab name="INVOICE" label="INVOICE" data-cy="invoice-payment-selector" />
      <q-tab name="LNURL" label="LNURL" />
      <q-tab name="LNADDR" label="LNADDR" />
      <q-tab name="OFFER" label="OFFER" />
      <q-tab name="DELAYED" label="DELAYED" />
    </q-tabs>
  </q-footer>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {SET_DELAYED_FEEDING, SET_PAYMENT_TYPE} from "../store/mutations";
import {INVOICE} from "../store/actions";
import Offer from "components/Offer";
import LightningUrl from "components/LightningUrl";
import LightningAddress from "components/LightningAddress";
import DelayFeeding from "components/DelayFeeding";

export default {
  name: "PaymentTypes",
  // eslint-disable-next-line vue/no-unused-components
  components: {DelayFeeding, LightningAddress, LightningUrl, Offer},
  data()  {
    return {
      delayFeeding: false,
      invoiceBtnDisabled: false
    }
  },
  computed: {
    tab: {
      get() {
        return this.paymentType
      },
      set(value) {
        this.SET_PAYMENT_TYPE(value)
      }
    },
    ...mapGetters(['buttonDisabled', 'loadingInvoice', 'paymentType']),
  },
  methods: {
    invoiceRequest() {
      this.invoiceBtnDisabled = true
      setTimeout(() => this.invoiceBtnDisabled = false, 2000)
      return this.INVOICE(this.delayFeeding)
    },
    ...mapActions([INVOICE]),
    ...mapMutations([SET_DELAYED_FEEDING, SET_PAYMENT_TYPE])
  }
}
</script>

<style scoped>

</style>
