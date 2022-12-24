<template>
  <q-form ref="createInvoiceForm">
    <div class="row justify-center">
      <div class="col-12 col-md-3"></div>
      <div class="col-12 col-md-6">
        <ButtonV3
          class="q-mx-md"
          label="submit"
          data-cy="createLightningInvoiceButton"
          type="submit"
          @click.prevent="invoiceRequest"
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
          <q-tooltip>Receive token(s) to use at your convenience. </q-tooltip>
        </q-checkbox>
      </div>
    </div>
  </q-form>
</template>
<script>
import ButtonV3 from "components/ButtonV3"
import AppMixin from "src/mixins/AppMixin"

export default {
  name: "LightningInvoiceForm",
  components: { ButtonV3 },
  mixins: [AppMixin],
  data() {
    return {
      delayFeeding: false,
    }
  },
  methods: {
    invoiceRequest() {
      return this.INVOICE({
        delayFeeding: this.delayFeeding,
        feedings: this.feedings,
      })
    },
  },
}
</script>
