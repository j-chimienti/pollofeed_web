<template>
  <footer >
    <div class="row flex flex-center">
      <a  href="https://lightningchance.com">
        <img :src="wheel" alt="spin" width="100"/>
      </a>
      <a href="https://btcblackjack.org">
        <img :src="blackjack" width="100" alt="blackjack"/>
      </a>
    </div>
    <NavLinks class="lt-sm"/>
  </footer>
</template>

<script>
import wheel from "assets/wheel_inner.svg"
import blackjack from "assets/blackjack.png"
import NavLinks from "components/NavLinks";

export default {
  name: "Footer",
  components: {NavLinks},
  data() { return {  wheel, blackjack}}
}
</script>

<style scoped>

</style>
