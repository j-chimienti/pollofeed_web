<template>
  <q-card class="q-px-lg loginCard text-dark">
    <SocialAuth />
    <q-form
      @submit="login"
      class="q-my-lg text-center"
      ref="loginForm"
      data-cy="loginForm"
    >
      <q-input
        type="email"
        placeholder="email"
        v-model="email"
        lazy-rules
        :rules="[(v) => isValidEmail(v)]"
      />
      <q-input
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        placeholder="Password"
        v-model="password"
        label="password"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length >= 8) ||
            'Password must be more than 8 characters',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="passwordVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="passwordVisible = !passwordVisible"
          />
        </template>
      </q-input>
      <q-input
        v-if="loginType === 'signup'"
        type="password"
        name="passwordVerify"
        placeholder="Verify Password"
        v-model="passwordVerify"
        label="password"
        lazy-rules
        :rules="[
          (val) =>
            (loginType === 'signup' ? val === password : true) ||
            'Password verification failed',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="passwordVisibleVerify ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="passwordVisibleVerify = !passwordVisibleVerify"
          />
        </template>
      </q-input>

      <q-btn
        type="submit"
        :label="loginType"
        color="primary"
        :loading="loadingLogin"
      />

      <div class="q-mt-md pointer">
        <p @click="LOGIN_TYPE('login')" v-if="loginType === 'signup'">
          Already have an account? sign in
        </p>
        <p @click="LOGIN_TYPE('signup')" v-else>
          Don't have an account? sign up
        </p>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
import { LOGIN, SIGNUP } from "./actions"
import { CLEAR_REQUESTING_SESSION, LOGIN_MODAL_VISIBLE } from "./mutations"
import SocialAuth from "./SocialAuth"
import AppMixin from "src/mixins/AppMixin"

export default {
  name: "Login",
  components: { SocialAuth },
  data() {
    return {
      password: "",
      email: "",
      passwordVerify: "",
      loadingLogin: false,
      passwordVisible: false,
      passwordVisibleVerify: false,
    }
  },
  mixins: [AppMixin],
  computed: {
    ...mapGetters(["requestingSession", "authError"]),
  },
  methods: {
    ...mapMutations([CLEAR_REQUESTING_SESSION, LOGIN_MODAL_VISIBLE]),
    ...mapActions([LOGIN, SIGNUP]),
    login() {
      const { password, email, loginType } = this
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.loadingLogin = true
          if (loginType === "signup")
            return this.SIGNUP({ password, email })
              .catch((err) => {
                this.$q.notify({
                  message: "signup error " + err,
                  type: "negative",
                })
              })
              .finally(() => {
                this.loadingLogin = false
              })
          else
            return this.LOGIN({ password, email })
              .catch((err) => {
                this.$q.notify({
                  message: "Login Error " + err,
                  type: "negative",
                })
              })
              .finally(() => {
                this.loadingLogin = false
              })
        } else {
          this.loadingLogin = false
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
