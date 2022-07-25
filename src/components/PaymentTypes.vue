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
              <ButtonV2 data-cy="invoice_button" label="create invoice" @click.prevent="invoiceRequest()" />
            </div>
            <div class="row justify-center">
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
                >Token is in invoice description, when paid it's valid for 1 time use whenever.</q-tooltip
                >
              </q-checkbox>
              <q-input
                label="feedings"
                max="50"
                type="number" v-model.number="feedings" style="max-width: 100px" filled/>
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
    <q-btn v-if="invoice" @click="SET_INVOICE(null)" label="clear invoice"/>
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
import TransactionSuccess from "./TransactionSuccess"

export default {
  name: "PaymentTypes",
  mixins: [AppMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: {
    TransactionSuccess,
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
