<template>
  <div>

    <div v-if="loadingInvoice">
      <h3 class="text-center">LOADING...</h3>
    </div>
    <div v-else>
      <q-tab-panels
        v-model="tab"
        animated
        class="text-center"
        style="background: #fff6ce; min-height: 300px"
      >
        <q-tab-panel name="INVOICE">

          <InvoiceModal v-if="invoiceUnpaid" />
          <div v-else>
            <div class="row justify-center">
              <div class="col-12 col-md-3"></div>
              <div class="col-12 col-md-6">
                <ButtonV3 class="q-mx-md" label="create invoice" @click.prevent="invoiceRequest()"/>
              </div>
              <div class="col-12 col-md-3">
              <q-input
                label="feedings"
                class="q-pb-md"
                min="1"
                max="50"
                type="number" v-model.number="feedings"/>
                <q-checkbox
                  label="Give me token to feed"
                  v-model="delayFeeding"
                  data-cy="delayed-order-selector"
                  name="delayFeeding"
                  value="delayed"
                  unchecked-value="not_delayed"
                  class="q-pr-md"
                >
                  <q-tooltip
                  >Receive token(s) to use at your convenience.</q-tooltip
                  >
                </q-checkbox>
              </div>

            </div>

          </div>
          <div class="row justify-center q-my-lg">

            <q-expansion-item
              label="lnurl & lnaddr"
              expand-separator
            >
              <qrcode-vue
                foreground="#8E1116"
                background="#FFF6CE"
                :value="lnurl"
                margin="3"
                size="250"
                level="H"
              />
              <p>lnaddr: {{lightningAddress}}</p>
              <p>
                lnurl: <a class="text-small" :href="'lightning:' + lnurl">{{lnurl}}</a>
              </p>
              <br/>
<!--              <p>or</p>-->
<!--              <div class="text-h5">give token and feed later</div>-->
<!--              <qrcode-vue-->
<!--                foreground="#8E1116"-->
<!--                background="#FFF6CE"-->
<!--                :value="lnurlDelayed"-->
<!--                margin="3"-->
<!--                size="250"-->
<!--                level="H"-->
<!--              />-->



            </q-expansion-item>
          </div>
          <BitcoinPayment/>
        </q-tab-panel>
        <q-tab-panel name="TOKENS"><DelayFeeding /></q-tab-panel>
      </q-tab-panels>
      <div class="row justify-center">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            v-for="t in paymentTypes"
            :key="t.type"
            :name="t.type"
            :label="t.label"
          />
        </q-tabs>

      </div>
    </div>

    <q-btn v-if="invoice" @click="SET_INVOICE(null)" label="clear invoice" size="sm" color="primary"/>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import { SET_DELAYED_FEEDING, SET_PAYMENT_TYPE } from "../store/mutations"
import Offer from "components/Offer"
import LightningUrl from "components/LightningUrl"
import LightningAddress from "components/LightningAddress"
import DelayFeeding from "components/DelayFeeding"
import ButtonV2 from "./ButtonV2"
import InvoiceModal from "./InvoiceModal"
import AppMixin from "../mixins/AppMixin"
import LeftArrow from "./LeftArrow"
import RightArrow from "./RightArrow"
import BitcoinPayment from "./BitcoinPayment"
import ButtonV3 from "components/ButtonV3"

export default {
  name: "PaymentTypes",
  mixins: [AppMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: {
    ButtonV3,
    BitcoinPayment,
    RightArrow,
    LeftArrow,
    InvoiceModal,
    ButtonV2,
    DelayFeeding,
    LightningAddress,
    LightningUrl,
    Offer,
  },
  data() {
    return {
      delayFeeding: false,
    }
  },
  computed: {

    tab: {
      get() {
        return this.paymentType
      },
      set(value) {
        this.SET_PAYMENT_TYPE(value)
      },
    },
  },
  methods: {
    invoiceRequest() {
      return this.INVOICE({
        delayFeeding: this.delayFeeding,
        feedings: this.feedings
      })
    },
    ...mapMutations([SET_DELAYED_FEEDING, SET_PAYMENT_TYPE]),
  },
}
</script>

<style scoped>
.view-text {
  /*font-style: normal;*/
  /*font-weight: 400;*/
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.amount-txt {
  font-size: 1.75rem;
  line-height: 1.75rem;
}
</style>
