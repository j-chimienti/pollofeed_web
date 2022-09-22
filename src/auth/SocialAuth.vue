<template>
  <div class="social-auth">
    <q-btn color="primary" @click="onSubmit('google')" text-color="white">
      <div class="btn-icon">
        <q-img src="../assets/google.png" width="32" />
      </div>
      <div class="btn-text">LOGIN WITH GOOGLE</div>
    </q-btn>
  </div>
</template>

<script>
import { LocalStorageKeys } from "../constants"
import { LocalStorage } from "quasar"
import { REQUESTING_SESSION } from "./mutations"
import { mapMutations } from "vuex"

export default {
  name: "SocialAuth",
  methods: {
    ...mapMutations([REQUESTING_SESSION]),
    onSubmit(provider) {
      this.REQUESTING_SESSION(true)
      return fetch(`/api/authorize/${provider}`)
        .then((res) => res.json())
        .then((res) => {
          const { url } = res
          LocalStorage.set(LocalStorageKeys.AUTH_PROVIDER, provider)
          window.location = url
        })
        .catch(() => {
          this.$q.notify({
            message: "Error logging in",
          })
          this.REQUESTING_SESSION(false)
        })
    },
  },
}
</script>

<style scoped lang="scss">
$btn-height: 3rem;
.social-auth {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2vmin 0;
  display: flex;
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: bold;
    margin: 0.75em 0;
    width: 90%;
    height: $btn-height;
    position: relative;
    .btn-icon {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      width: $btn-height;
      background-color: rgba(0, 0, 0, 0.5);
      i {
        font-size: 1.75rem;
        float: left;
        margin: 0 0.375rem 0 0.375rem;
      }
    }
  }
}
.btn-text {
  flex: 1;
}
</style>
