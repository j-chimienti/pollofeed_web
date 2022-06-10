<template>
  <div>
    <p>Lightning Address</p>
    <div class="row flex justify-center" style="overflow-y: scroll">
      <div class="col-12 col-md-6">
        <a :href="url">
          <qrcode-vue
            foreground="#8E1116"
            background="#FFF6CE"
            :value="address"
            margin=3
            size=250
            level="H"
          />
        </a>
      </div>
      <div class="col-12 col-md-6">
        <div class="row justify-center">{{ address }}</div>
        <div class="row justify-center">
          <CopyBtn @click="copyAddr" label="copy" />
          <a href="https://lightningaddress.com/">
            <CopyBtn label="learn" />
          </a>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue"
import { copyToClipboard, openURL } from "quasar"
import CopyBtn from "./CopyBtn"

export default {
  name: "LightningAddress",
  methods: {
    open() {
      openURL(this.url)
    },
    copyAddr() {
      copyToClipboard(this.url)
      this.$q.notify("Copied address")
    },
  },
  data() {
    const address = process.env.LIGHTNING_ADDRESS
    const url = "lightning:" + address
    return {
      address,
      url,
    }
  },
  components: {
    CopyBtn,
    QrcodeVue,
  },
}
</script>

<style scoped></style>
