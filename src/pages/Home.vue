<template>
  <q-page>
    <div class="home">
      <div class="row justify-center q-pa-md">
        <q-card class="card-stream q-pa-md">
<!--          <div style="position: relative; padding-top: 100%;"><iframe src="https://iframe.videodelivery.net/69cdddecdfb14ec63b653cf47db95ba4?autoplay=true&poster=https%3A%2F%2Fvideodelivery.net%2F96bb44974f6b1a14bab8ee78ad4f3945%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&primaryColor=%23ed1c27" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow=" autoplay; encrypted-media;  " allowfullscreen="true"></iframe></div>-->
          <div class="row justify-center">
            <div class="col" style="max-width: 640px;">

              <q-responsive :ratio="4/3">

<!--                <iframe-->
<!--                  id="live_stream"-->
<!--                  :src="STREAM_URL"></iframe>-->
<!--                <video ref="live_stream"></video>-->
<!--                <div>-->
<!--                  <iframe src="https://iframe.videodelivery.net/a57070b12b6442e1090939805b36287a?autoplay=true&poster=https%3A%2F%2Fvideodelivery.net%2Fa57070b12b6442e1090939805b36287a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>-->
<!--                </div>-->
              <img
                :src="STREAM_URL"
                alt="live stream"
                id="live_stream"

                :loading="false"
              />
              </q-responsive>

            </div>
          </div>
          <PaymentTypes />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import InvoiceModal from "../components/InvoiceModal"
  import FeedSettings from "components/FeedSettings"
  import Footer from "components/Footer"
  import PaymentTypes from "components/PaymentTypes"
  import AppMixin from "../mixins/AppMixin"
  import SocialShare from "../components/social/SocialShare"

  // import Hls from "hls.js"
  export default {
  name: "Home",
  mixins: [AppMixin],
  methods: {
    checkInvoice() {
      if (this.invoiceUnpaid) this.GET_INVOICE()
    },
  },

  mounted() {
    const { paid, token } = this.$route.query
    if (paid) this.$q.notify("Invoice paid")

    if (token) {
      this.SET_INVOICE(null)
      this.SET_DELAYED_FEEDING(token)
      this.SET_USE_TOKEN_NOW(token)
    }

    this.invoiceInterval = setInterval(() => {
      this.checkInvoice()
    }, 5000)
    this.checkInvoice()

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
  },
  data() {
    return {
      // STREAM_URL: process.env.STREAM_URL,
      STREAM_URL: "https://stream.pollofeed.com",
      // STREAM_URL: "https://via.placeholder.com/640x480.png?text=pollofeed",
      invoiceInterval: null,
    }
  },
  components: {
    SocialShare,
    PaymentTypes,
    Footer,
    FeedSettings,
    InvoiceModal,
  },
}
</script>

<style scoped>
.home {
  min-height: 80vh;
}

#live_stream {
  border: 0.375rem solid #8e1116;
  border-radius: 1rem;
}

.card-stream {
  width: 800px;
  /*height: 934px;*/
  background: #fff6ce;
  /* Red Pigment/700 */
  border: 0.5rem solid #8e1116;
  border-radius: 36px;
  margin-top: 50px;
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
    margin-top: 0;
  }
}
</style>
