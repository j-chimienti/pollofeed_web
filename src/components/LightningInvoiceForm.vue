<template>
  <div class="justify-center">
    <q-form ref="createInvoiceForm" @submit="invoiceRequest">
      <ButtonV3
        label="submit"
        data-cy="createLightningInvoiceButton"
        type="submit"
        :loading="loadingInvoice"
        @click="invoiceRequest"
      />
      <div class="row justify-center vertical-middle q-py-md">
        <q-input
          label="feedings"
          min="1"
          max="50"
          style="width: 100px"
          type="number"
          v-model.number="feedings"
        >
        </q-input>
        <q-checkbox
          label="Give me token to feed"
          v-model="delayFeeding"
          data-cy="delayed-order-selector"
          name="delayFeeding"
          value="delayed"
          unchecked-value="not_delayed"
        >
          <q-tooltip>Receive token(s) to use at your convenience. </q-tooltip>
        </q-checkbox>
      </div>
    </q-form>
  </div>
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
