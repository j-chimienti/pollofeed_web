<template>
  <q-dialog v-model="loginModalVisible">
    <q-card class="q-px-lg loginCard" dark>
      <SocialAuth />
      <hr/>
      <q-form @submit="login" class="q-my-lg text-center" ref="loginForm">
        <q-input
          type="email"
          placeholder="email"
          v-model="email"
          required
          lazy-rules
          :rules="[(val) => (val && val.length > 5) || 'Invalid login']"
        />
        <q-input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          required
          lazy-rules
          label="password"
          :rules="[
          (val) =>
            (val && val.length >= 8) ||
            'Password must be more than 8 characters',
        ]"
        />

        <q-btn @click="login" label="login" color="accent"/>


      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from "vuex"
  import { LOGIN, SIGNUP } from "./actions"
  import { CLEAR_REQUESTING_SESSION, LOGIN_MODAL_VISIBLE } from "./mutations"
  import SocialAuth from "./SocialAuth"

  export default {
  name: "Login",
  components: { SocialAuth },
  data() {
    return { password: "", email: "" }
  },

  computed: {
    ...mapGetters(["requestingSession", "authError"]),
    loginModalVisible: {
      get() {
        return this.$store.getters.loginModalVisible
      },
      set(v) {
        this.LOGIN_MODAL_VISIBLE(v)
      },
    },
  },
  methods: {

    ...mapMutations([CLEAR_REQUESTING_SESSION, LOGIN_MODAL_VISIBLE]),
    ...mapActions([LOGIN, SIGNUP]),
    login() {
      const { password, email } = this
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          return this.SIGNUP({ password, email }).catch((err) => {
            this.$q.notify({
              message: "Error " + err,
              type: "negative",
            })
          })
        } else {
          this.$q.notify({
            message: "Invalid request",
            type: "negative",
          })
        }
      })

    },
  },
}
</script>

<style lang="scss" scoped>
@import "../css/quasar.variables";
*,
.q-field {
  color: white;
}
.signup-link {
  border-bottom: 4px solid transparent;
  transition: all 0.1s ease-in-out;
  font-size: 1.75rem;
  cursor: pointer;
}
.signup-link:hover {
  border-bottom: 4px solid green;
}

.active {
  border-bottom: 4px solid green;
}
.loginCard {
  width: 400px;
}

input,
label {
  color: white !important;
  font-size: 1.25rem;
}

  svg {
    cursor: pointer;
  }

  .login-btn {
    width: 150px;
  }
</style>
