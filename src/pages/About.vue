<template>
  <q-page class="full-width column no-wrap  items-center">
    <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
      <q-img
          loading="lazy"
          spinner-color="white"
          alt="" :src="KarenLori">
        <div class="absolute-bottom text-subtitle2">
          Karen and Lori.
          Always together. The oldest 2 Rhode Island Reds. Hatched 15/Aug/2016
        </div>
      </q-img>
    </q-card>
    <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
      <q-img
          loading="lazy"
          spinner-color="white"
          alt="" :src="Parkour">
        <div class="absolute-bottom text-subtitle2">
          Parkour.
          Always jumping around and loves to hit pen with both feet
        </div>
      </q-img>
    </q-card>
    <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
      <q-img
          loading="lazy"
          spinner-color="white"
          alt="" :src="BigBlack">
        <div class="absolute-bottom text-subtitle2">
        Big Black
        The alpha hen. Lord of the Seven Kingdoms and Protector of the Realm
        </div>
      </q-img>
    </q-card>
  </q-page>
</template>

<script>
import BigBlack from "../assets/img/BigBlack.jpg"
import Parkour from "../assets/img/Parkour.jpg"
import KarenLori from "../assets/img/KarenLori.jpg"
import pf_header from "../assets/img/PF/pf_header.jpg"
import pollofeed_logo from "../assets/img/PF/pollofeed_logo.png"

export default {
  name: "About",
  data() {
    return { BigBlack, Parkour, KarenLori, pf_header, pollofeed_logo }
  },
}
</script>

<style scoped>


</style>
