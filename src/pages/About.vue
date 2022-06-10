<template>
  <q-page class="about row justify-center">
    <q-card
      class="column items-center q-pa-lg"
      style="max-width: 50vw; background: #fff6ce; border: 2px solid #8e1116"
    >
      <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
        <q-img loading="lazy" spinner-color="white" alt="" :src="KarenLori">
          <div class="absolute-bottom text-subtitle2">
            Karen and Lori. Always together. The oldest 2 Rhode Island Reds.
            Hatched 15/Aug/2016
          </div>
        </q-img>
      </q-card>
      <p>
        At Pollofeed, we let you get up close and personal with the FEED. Our
        live video feed shows our chickens roaming around the coop, and for a
        small fee, you can instantly feed them from anywhere in the world! It's
        a fun and interactive way to digitally live a bit of farm life. Also,
        you can be sure that our chickens are always well-fed and healthy.
      </p>
      <p>
        So, feed chickens from the comfort of your own home. Simply pay using
        bitcoin lightning, and our feeder will activate to dispense food to the
        chickens in real-time. You can even watch them live on our website!
      </p>
      <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
        <q-img loading="lazy" spinner-color="white" alt="" :src="Parkour">
          <div class="absolute-bottom text-subtitle2">
            Parkour. Always jumping around and loves to hit pen with both feet
          </div>
        </q-img>
      </q-card>
      <p>
        We believe that everyone should have the opportunity to help care for
        animals, and that's why we made this service available to anyone with an
        internet connection.
      </p>
      <p>
        Chickens are fascinating creatures that can be unpredictable. Get to
        know our in-house chicken people, and you will understand why these hens
        act the way they do! Our oldest pair is Lori & Karen - curious little
        Rhode Island Reds! Parkour likes jumping toward fences, while the alpha
        Big Black stays calm but still leads his flock into battle when needed.
      </p>
      <q-card class="q-my-md" style="width: 80vw; max-width: 600px">
        <q-img loading="lazy" spinner-color="white" alt="" :src="BigBlack">
          <div class="absolute-bottom text-subtitle2">
            Big Black The alpha hen. Lord of the Seven Kingdoms and Protector of
            the Realm
          </div>
        </q-img>
      </q-card>
      <p>
        We deeply care about your natural well-being in this rush of advanced
        living. The small fee we charge is only to keep the service up and
        running, and No, we don't keep our chickens hungry.
      </p>
      <p>They just eat a lot!</p>
      <p>Let's feed some chickens?</p>
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
.about {
  font-family: "LuckiestGuy";
}

p {
  font-size: 1.5rem;
}
</style>
