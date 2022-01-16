<template>
  <q-input
      readonly
      class="cursor-pointer"
      @click="copyAddr"
      :model-value="address"/>
  <div class="row q-py-md">
    <q-btn
        type="a"
        :href="url"
        size="sm"
        icon="link"
        label="Open in wallet"
    />

  </div>
  <div class="row flex justify-center">
    <a :href="url" class="bg-white">
      <qrcode-vue
          size="250"
          margin="3"
          :value="address"/>
    </a>
  </div>
  <div class="row flex justify-center q-pt-md">
    <a href="https://lightningaddress.com/">Learn about Lighting Address</a>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import {copyToClipboard, openURL} from "quasar";
export default {
  name: "LightningAddress",
  methods: {
    open() {
      openURL(this.url)
    },
    copyAddr() {
      copyToClipboard(this.url)
      this.$q.notify("Copied address")
    }
  },
  data() {
    const address = process.env.LIGHTNING_ADDRESS
    const url = 'lightning:' + address
    return {
      address,
      url
    }
  },
  components: {
    QrcodeVue
  }
}
</script>

<style scoped>

</style>
