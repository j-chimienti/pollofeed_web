<template>
  <div>
      <q-input readonly v-model="displayUrl" @click="copyUrl"  />
      <div class="row flex justify-center q-my-md">
        <q-btn
            type="a"
            size="sm"
           :href="displayUrl"
          >
          <q-icon name="link"/>
          Open in wallet
        </q-btn>
      </div>
     <div class="row flex justify-center q-my-md">
       <a :href="displayUrl" class="bg-white">
         <qrcode-vue
             margin="3"
             :value="displayUrl" :size="250"/>
       </a>
     </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import {copyToClipboard, openURL} from "quasar";
export default {
  name: "LightningUrl",
  components: {
    QrcodeVue
  },
  methods: {
    open() {
      openURL(this.displayUrl)
    },
    copyUrl() {
      copyToClipboard(this.displayUrl)
      this.$q.notify("Copied lnurl!")
    }
  },
  data() {
    const url = process.env.LIGHTNING_URL
    return {
      url,
      displayUrl: "lightning:" + url.toUpperCase()
    }
  },
}
</script>

<style scoped>

</style>
