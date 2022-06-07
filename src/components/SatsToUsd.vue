<template>
  <div></div>
</template>

<script>
export default {
  name: "SatsToUsd",
  props: ["amount"],
  computed: {
    amtFiat() {
      return this.btc_usd
    },
  },
}
</script>

<style scoped>
div {
  font-family: "Luckiest Guy";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 39px;
  text-align: center;

  /* Red Pigment/700 */

  color: #8e1116;
}
</style>
