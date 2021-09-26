<template>
  <div>{{address}}</div>
  <qrcode-vue size="300" :value="address"/>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
  name: "LightningAddress",
  data() {
    return {
      address: "pollofeed@pollofeed.com"
    }
  },
  components: {
    QrcodeVue
  }
}
</script>

<style scoped>

</style>
