<template>
  <q-page>
    <div class="home">
      <div class="row justify-center">
        <MobileBottomNav class="lt-sm" />
        <q-card class="card-stream q-pa-md">
          <div class="row justify-center">
            <div class="col" style="max-width: 640px">
              <q-responsive :ratio="4 / 3">
                <q-img :src="STREAM_URL" id="live_stream" :loading="false" />
              </q-responsive>
            </div>
          </div>
          <PaymentTypes />
        </q-card>
      </div>
      <LoginModal />
    </div>
  </q-page>
</template>

<script>
import NavBarV2 from "../components/NavBarV2"
import InvoiceModal from "../components/InvoiceModal"
import Footer from "components/Footer"
import PaymentTypes from "components/PaymentTypes"
import AppMixin from "../mixins/AppMixin"
import SocialShare from "../components/social/SocialShare"
import { OPEN_WEBSOCKET } from "../auth/actions"
import LoginModal from "../auth/LoginModal"
import { notifyInvoicePaid } from "src/services/notificationService"
import MobileBottomNav from "components/MobileBottomNav"

const CHECK_INVOICE_INTERVAL = process.env.CHECK_INVOICE_INTERVAL

// import Hls from "hls.js"

export default {
  name: "Home",
  mixins: [AppMixin],
  methods: {
    checkInvoice() {
      if (this.invoiceUnpaid) this.GET_INVOICE()
    },
    async initUser(token) {
      await this.RESUME_SESSION()
      await this.$store.dispatch(OPEN_WEBSOCKET)
      if (token) {
        this.SET_INVOICE(null)
        this.SET_DELAYED_FEEDING(token)
        this.SET_USE_TOKEN_NOW(token)
      }
      this.checkInvoice()
      this.invoiceInterval = setInterval(() => {
        this.checkInvoice()
      }, CHECK_INVOICE_INTERVAL)

      this.webSocketInterval = setInterval(() => {
        if (!this.connectedToWebsocket) {
          console.log("reopen ws")
          this.$store.dispatch(OPEN_WEBSOCKET)
        }
      }, 5000)
    },
  },

  mounted() {
    const { paid, token } = this.$route.query
    if (paid) notifyInvoicePaid(null)

    this.initUser(token)

    //
    // var videoSrc = 'https://cloudflarestream.com/a120388a5d58fbb78a795d4b0cfb94c2/manifest/video.m3u8';
    // var video = this.$refs.live_stream
    // if (Hls.isSupported()) {
    //   var hls = new Hls({
    //     debug: true,
    //   });
    //   hls.loadSource(videoSrc);
    //   hls.attachMedia(video);
    //   hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    //     video.muted = true;
    //     video.play();
    //   });
    // }
    // // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
    // // This is using the built-in support of the plain video element, without using hls.js.
    // else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //   video.src = videoSrc
    //   video.addEventListener('canplay', function () {
    //     video.play();
    //   });
    // }
  },
  unmounted() {
    if (this.invoiceInterval) clearInterval(this.invoiceInterval)
    if (this.webSocketInterval) clearInterval(this.webSocketInterval)
  },
  data() {
    return {
      STREAM_URL: `${process.env.STREAM_URL}?${new Date()}`,
      // STREAM_URL: "https://stream.pollofeed.com?" + new Date(),
      // STREAM_URL: "https://via.placeholder.com/640x480.png?text=pollofeed",
      invoiceInterval: null,
    }
  },
  components: {
    MobileBottomNav,
    LoginModal,
    NavBarV2,
    SocialShare,
    PaymentTypes,
    Footer,
    InvoiceModal,
  },
}
</script>

<style scoped lang="scss">
#live_stream {
  border: 0.375rem solid #8e1116;
  border-radius: 1rem;
}

.card-stream {
  width: 800px;
  /*height: 934px;*/
  background: $light_background;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
  /*padding-left: 40px;*/
  /*padding-right: 40px;*/
  padding-top: 2.625rem;

  /*border-top: 15px solid;*/
  /*border-image-source: linear-gradient(116.32deg, #800C10 -18.47%, rgba(250, 78, 85, 0.85) 17.04%, #EFDE3B 50.33%, rgba(222, 56, 62, 0.85) 94.72%, #800C10 122.09%);*/

  /*border: 15px solid #8E1116;*/
  /*border-image-source: linear-gradient(116.32deg, #800C10 -18.47%, rgba(250, 78, 85, 0.85) 17.04%, #EFDE3B 50.33%, rgba(222, 56, 62, 0.85) 94.72%, #800C10 122.09%);*/
}

@media all and (max-width: 1000px) {
  .card-stream {
    width: 100%;
    max-width: 700px;
    margin-top: 0;
  }
}
</style>
