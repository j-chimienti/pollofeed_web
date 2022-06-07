<template>
  <div>
    <div class="row flex justify-center">
      <a :href="href">
        <qrcode-vue
          foreground="#8E1116"
          background="#FFF6CE"
          :value="bolt12"
          margin="3"
          size="250"
          level="H"
        />
      </a>
      <div>
        <div class="row justify-start">
          <CopyBtn @click="copyBolt12" label="copy" />
          <a href="https://bolt12.org">
            <CopyBtn label="learn" />
          </a>
        </div>
        <p>{{ bolt12.slice(0, 20) }}...</p>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue"
import { copyToClipboard, openURL } from "quasar"
import CopyBtn from "./CopyBtn"
export default {
  name: "Offer",
  components: {
    CopyBtn,
    QrcodeVue,
  },
  methods: {
    open() {
      openURL(this.href)
    },
    copyBolt12() {
      copyToClipboard(this.bolt12)
      this.$q.notify("Copied bolt12")
    },
  },
  data() {
    const bolt12 = process.env.BOLT12
    return {
      bolt12,
      href: `lightning:${bolt12.toUpperCase()}`,
      qr: null,
    }
  },
}
</script>

<style scoped></style>
