<template>
  <div>
    <btc-usd/>
    <q-btn class="q-mx-md" type="a" :to="{name: 'about'}">about</q-btn>
<!--    <q-btn class="q-mx-md" type="a" :to="{name: 'swag'}">swag</q-btn>-->
  </div>
</template>

<script>
import BtcUsd from "components/BtcUsd";
export default {
  name: "NavLinks",
  components: {BtcUsd}
}
</script>

<style scoped>

</style>
