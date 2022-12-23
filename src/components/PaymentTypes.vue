<template>
  <div>
    <div>
      <q-tab-panels
        v-model="tab"
        animated
        class="text-center"
        style="background: #fff6ce; min-height: 300px"
      >
        <q-tab-panel name="INVOICE">
          <InvoiceModal v-if="invoiceUnpaid" />
          <q-form v-else ref="createInvoiceForm">
            <div class="row justify-center">
              <div class="col-12 col-md-3"></div>
              <div class="col-12 col-md-6">
                <ButtonV3
                  class="q-mx-md"
                  label="create invoice"
                  data-cy="createLightningInvoiceButton"
                  :loading="loadingInvoice"
                  type="submit"
                  @click.prevent="invoiceRequest()"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  label="feedings"
                  class="q-pb-md"
                  min="1"
                  max="50"
                  type="number"
                  v-model.number="feedings"
                />
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
          </q-form>
          <div class="row justify-center q-my-lg">
            <q-expansion-item label="lnurl & lnaddr" expand-separator>
              <q-card style="width: 300px" class="q-my-lg">
                <vue-qr :text="lnurl" :size="250" colorDark="#8E1116"></vue-qr>
                <q-card-section>
                  <div class="text-h6">Scan LNURL in compatible wallet</div>
                  <!--                  <div class="text-subtitle2"></div>-->
                </q-card-section>
              </q-card>
              <q-card style="width: 300px">
                <vue-qr
                  :text="lightningAddress"
                  :size="250"
                  colorDark="#8E1116"
                ></vue-qr>
                <q-card-section>
                  <div class="text-h6">
                    Scan Address: {{ lightningAddress }}
                  </div>
                </q-card-section>
              </q-card>
              <br />
            </q-expansion-item>
            <q-expansion-item label="btc" expand-separator>
              <BitcoinPayment />
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

    <q-btn
      v-if="invoiceUnpaid"
      @click="SET_INVOICE(null)"
      label="clear invoice"
      size="sm"
      color="primary"
    />
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
        feedings: this.feedings,
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
