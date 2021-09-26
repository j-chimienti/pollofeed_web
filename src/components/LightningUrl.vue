<template>
  <div>
      <q-input readonly v-model="displayUrl"  />
      <a class="btn btn-primary" :href="displayUrl">
        <i class="fa fa-external-link"></i>
      </a>
    <br/>
     <a :href="displayUrl">
      <qrcode-vue :value="displayUrl" :size="300"/>
     </a>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
  name: "LightningUrl",
  components: {
    QrcodeVue
  },
  data() {
    // todo
    const url = process.env.VUE_APP_LNURL_PAY_URL
    return {
      url,
      displayUrl: "lightning:" + url.toUpperCase()
    }
  },
}
</script>

<style scoped>

</style>
