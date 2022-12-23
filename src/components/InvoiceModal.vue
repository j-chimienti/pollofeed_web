<template>
  <div class="text-center" style="width: 100%">
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <a v-bind:href="href" class="full-height pointer" ref="bolt11qrcode">
          <vue-qr
            :logoSrc="logo"
            :text="bolt11"
            :size="250"
            colorDark="#8E1116"
          ></vue-qr>
        </a>
      </div>
      <div class="col-12 col-md-4 text-center">
        <p>
          <span
            v-if="feedPriceUSD"
            data-cy="feedPrice"
            class="feed-price-usd"
            >{{ feedPriceUSD }}</span
          >
          <span v-if="timeRemaining">
            <q-icon name="timer"></q-icon>
            <span style="width: 2rem">{{ timeRemaining }}</span>
          </span>
        </p>
        <p>
          <CopyBtn
            :label="copyText"
            data-cy="copyBolt11"
            @click="copyPaymentRequest"
          />
          <a :href="href">
            <CopyBtn label="share" data-cy="shareBolt11" />
          </a>
        </p>
        <q-input
          disabled
          @click="copyPaymentRequest"
          class="bolt11"
          data-cy="bolt11"
          :model-value="bolt11"
        />
      </div>
      <div class="col-12 col-md-4"></div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue"
import { copyToClipboard, Notify, openURL } from "quasar"
import CopyBtn from "./CopyBtn"
import ButtonV2 from "./ButtonV2"
import _get from "lodash.get"
import AppMixin from "../mixins/AppMixin"

export default {
  components: {
    ButtonV2,
    CopyBtn,
    QrcodeVue,
  },
  name: "InvoiceModal",
  mounted() {
    this.updateDurationInterval = this.updateExp()
    // this.$refs.bolt11qrcode.scrollIntoView({ behavior: "smooth" })
  },
  unmounted() {
    if (this.updateDurationInterval) clearInterval(this.updateDurationInterval)
  },

  methods: {
    open() {
      openURL(this.href)
    },
    copyPaymentRequest() {
      copyToClipboard(this.bolt11)
      Notify.create("copied")
    },
    updateExp() {
      return setInterval(() => {
        const left = Math.max(0, this.timeLeft())
        this.timeRemaining = this.formatDur(left)
        // todo: payment expired
      }, 1000)
    },
    formatDur(x) {
      const h = (x / 3600) | 0,
        m = ((x % 3600) / 60) | 0,
        s = x % 60
      return (
        "" +
        (h > 0 ? h + ":" : "") +
        (m < 10 && h > 0 ? "0" : "") +
        m +
        ":" +
        (s < 10 ? "0" : "") +
        s
      )
    },
    timeLeft() {
      return ((this.expiresAt - Date.now()) / 1000) | 0
    },
  },
  mixins: [AppMixin],
  computed: {
    href() {
      return `lightning:${this.bolt11}`.toLowerCase()
    },
    expiresAt() {
      const ea = _get(this.invoice, "expires_at", 0)
      return new Date(ea * 1000).getTime()
    },
  },
  data() {
    return {
      updateDurationInterval: null,
      copyText: "copy",
    }
  },
}
</script>

<style scoped>
.feed-price-usd {
  font-style: normal;
  font-weight: 400;
  font-size: 2.25rem;
  line-height: 108%;
}

.bolt11 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  /*font-size: .8125rem;*/
  /*line-height: 109.5%;*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.invoice-title {
  font-family: "LuckiestGuy";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 39px;
  color: #8e1116;
}
</style>
