<template>
  <div>
    <p>Lighting URL</p>
    <div class="row flex justify-center">
      <div class="col-12 col-sm-6">
        <a :href="url">
          <qrcode-vue
            foreground="#8E1116"
            background="#FFF6CE"
            :value="url"
            margin="3"
            size="250"
            level="H"
          />
        </a>
      </div>
      <div class="col-12 col-sm-6">
        <div class="row flex justify-center q-my-lg">
          <q-checkbox
            label="I want to delay feeding"
            v-model="delayFeeding"
            data-cy="lnurl-delayed-order-selector"
            name="lnurl-delayFeeding"
            value="delayed"
            unchecked-value="not_delayed"
          >
            <q-tooltip> Pay now and feed later </q-tooltip>
          </q-checkbox>
        </div>
        <div class="row flex justify-center">
          <a :href="url" class="q-pr-md"><CopyBtn label="share" /> </a>
          <CopyBtn label="copy" @click="copyUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue"
import { copyToClipboard, LocalStorage, openURL } from "quasar"
import CopyBtn from "./CopyBtn"

export default {
  name: "LightningUrl",
  components: {
    CopyBtn,
    QrcodeVue,
  },
  methods: {
    open() {
      openURL(this.url)
    },
    copyUrl() {
      copyToClipboard(this.url)
      this.$q.notify("Copied lnurl!")
    },
  },
  computed: {
    url() {
      if (this.delayFeeding) return this.displayUrlDelayed
      else return this.displayUrl
    },
  },
  beforeUnmount() {
    if (this.delayFeeding) LocalStorage.set("lnurl_delayed", "delayed")
    else LocalStorage.set("lnurl_delayed", "not_delayed")
  },
  data() {
    const url = process.env.LIGHTNING_URL
    const urlD = process.env.LIGHTNING_URL_DELAYED
    const isDelayed = () => {
      const r = LocalStorage.getItem("lnurl_delayed")
      if (r && r === "delayed") return true
      else return false
    }
    return {
      lnurl: url,
      displayUrl: "lightning:" + url.toUpperCase(),
      displayUrlDelayed: "lightning:" + urlD.toUpperCase(),
      delayFeeding: isDelayed(),
    }
  },
}
</script>

<style scoped></style>
