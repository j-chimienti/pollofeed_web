<template>
  <div>
    <q-tab-panels v-model="tab" animated style="background: transparent">
      <q-tab-panel name="INVOICE">
        <div>
          <q-splitter v-model="splitterModel" style="min-height: 250px">
            <template v-slot:before>
              <q-tabs v-model="paymentTypeTab" vertical align="justify">
                <q-tab name="lightning" label="Lightning" />
                <q-tab name="btc" :icon="bitcoin" label="Bitcoin" />
                <q-tab name="lnurl" label="LNURL" />
                <q-tab name="lnaddr" label="LNADDR" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                style="background: transparent"
                v-model="paymentTypeTab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="lightning">
                  <InvoiceModal v-if="invoiceUnpaid" />
                  <LightningInvoiceForm v-else />
                </q-tab-panel>
                <q-tab-panel name="btc" class="text-center">
                  <BitcoinPayment />
                </q-tab-panel>

                <q-tab-panel name="lnurl">
                  <q-card style="width: 300px" class="q-my-lg">
                    <vue-qr
                      :text="lnurl"
                      :size="250"
                      colorDark="#8E1116"
                    ></vue-qr>
                    <q-card-section>
                      <div class="text-h6">Scan LNURL in compatible wallet</div>
                      <!--                  <div class="text-subtitle2"></div>-->
                    </q-card-section>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="lnaddr">
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
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </div>
      </q-tab-panel>
      <q-tab-panel name="TOKENS"><DelayFeeding /></q-tab-panel>
    </q-tab-panels>
    <q-separator />

    <q-tabs v-model="tab" dense align="justify" narrow-indicator>
      <q-tab
        v-for="t in paymentTypes"
        :key="t.type"
        :name="t.type"
        :label="t.label"
      />
    </q-tabs>
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
import DelayFeeding from "components/DelayFeeding"
import InvoiceModal from "./InvoiceModal"
import AppMixin from "../mixins/AppMixin"
import BitcoinPayment from "./BitcoinPayment"
import LightningInvoiceForm from "components/LightningInvoiceForm"
import btcIcon from "../assets/img/btcIcon.svg"
export default {
  name: "PaymentTypes",
  mixins: [AppMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: {
    LightningInvoiceForm,
    BitcoinPayment,
    InvoiceModal,
    DelayFeeding,
  },
  data() {
    return {
      paymentTypeTab: "btc",
      btcIcon,
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
