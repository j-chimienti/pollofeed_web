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
    const bolt12 = process.env.BOLT12
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
