<template>
  <footer >
    <div class="row flex flex-center">
      <a  href="https://tip.pollofeed.com">
        <q-icon name="thumb_up" size="lg"/>
        tips
      </a>
      <a  href="https://lightningchance.com">
        <img :src="wheel" alt="spin" width="100"/>
      </a>
      <a href="https://btcblackjack.org">
        <img :src="blackjack" width="100" alt="blackjack"/>
      </a>
    </div>
  </footer>
</template>

<script>
import wheel from "assets/wheel_inner.svg"
import blackjack from "assets/blackjack.png"

export default {
  name: "Footer",
  data() { return {  wheel, blackjack}}
}
</script>

<style scoped>

</style>
