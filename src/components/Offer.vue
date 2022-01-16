<template>
<div>
    <q-input readonly
             class="q-my-md pointer"
             label="Bolt12"
             @click="copyBolt12"  :model-value="bolt12"/>
  <div class="row flex justify-between q-my-sm">
    <q-btn type="a" size="sm"  :href="href" icon="link" label="Open in wallet"/>
    <a href="https://bolt12.org/">
      learn about offers
    </a>
  </div>
    <a :href="href" class="bg-white">
      <qrcode-vue
          margin="3"
          :value="bolt12" :size="250" level="H"/>
    </a>
    <div class="text-left">
      <div class="text-h6">Example payment</div>
      <code>lncli pay $(lncli fetchinvoice {{bolt12}} 2000 | jq '.invoice')</code>
    </div>
</div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import {copyToClipboard, openURL} from "quasar";
export default {
  name: "Offer",
  components: {
    QrcodeVue
  },
  methods: {
    open() {
      openURL(this.href)
    },
    copyBolt12() {
      copyToClipboard(this.bolt12)
      this.$q.notify("Copied bolt12")
    }
  },
  data() {
    const bolt12 = "lno1pgw5vet9vssyx6rfvd4k2mnnypqzqur0d3kx7en9v4jzucm0d52q6ur0d3kx7en9v4jzucm0d50zpypr2mfxalwqsynjdsc6rghq6uslycrrm5jj4jyaakpgqqm7nm8g7pqtsdkefnf206c4tt5nt70y0dg8s35905ph3exvwa8w6m5fs48dtxydvy8x96tfukp678s656tdc4tqtkalrnvn2u8j4k80j45925800u"
    return {
      bolt12,
      href: `lightning:${bolt12.toUpperCase()}`,
      qr: null
    }
  }
}
</script>

<style scoped>

</style>
