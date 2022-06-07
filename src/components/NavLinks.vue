<template>
  <div>
    <router-link type="a" :to="{ name: 'about' }">
      <ButtonV2 label="about" />
    </router-link>

    <!--    <router-link type="a" :to="{name: 'about'}">-->
    <!--      <ButtonV2 label="contact"/>-->
    <!--    </router-link>-->

    <!--    <router-link type="a" :to="{name: 'about'}">-->
    <!--      <ButtonV2 label="gallery"/>-->
    <!--    </router-link>-->
    <!--    <q-btn class="q-mx-md" type="a" :to="{name: 'swag'}">swag</q-btn>-->
  </div>
</template>

<script>
import BtcUsd from "components/BtcUsd"
import ButtonV2 from "./ButtonV2"
export default {
  name: "NavLinks",
  components: { ButtonV2, BtcUsd },
}
</script>

<style scoped></style>
