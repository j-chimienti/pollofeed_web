<template>
  <q-card  class="q-px-lg loginCard" >
    <img src="../assets/pollofeed_logo.png" style="width: 300px; padding-top: 10px;"/>
    <div class="row flex justify-around q-my-lg">
          <span @click="goToPage('login')"
                class="signup-link pointer"
                :class="{
                  'text-muted': dispatch === 'signup',
                  'active': dispatch === 'login'
              }"
                :disabled="dispatch === 'login'">login</span>
      <span @click="goToPage('signup')"
            class="signup-link pointer"
            :class="{'text-muted': dispatch === 'login', 'active': dispatch === 'signup'}"
            :disabled="dispatch === 'signup'">signup</span>
    </div>
    <q-form @submit="login">
      <q-input type="email" placeholder="email" v-model="email" required
               lazy-rules
               :rules="[ val => val && val.includes('@') && val.length > 3 || 'Invalid email']"
      />
      <q-input type="password" name="password"
               placeholder="Password"
               v-model="password"
               required
               label="password"
               :rules="[ val => val && val.length > 0 ||
                    'Please enter something']"
      />
      <div class="row flex justify-center q-mb-md">
        <q-btn class="text-capitalize"
               type="submit"
               size="30px"
               label="login"
               unelevated
               color="primary"/>
      </div>
    </q-form>
  </q-card>
</template>

<script>

import {mapActions} from 'vuex'
import {LOGIN} from '../store/actions'

export default {
  name: 'Login',
  data() { return { password: '', email: '' } },
  mounted() {
  },
  methods: {

    ...mapActions([LOGIN]),
    login() {
      const { password, email } = this
      return this.LOGIN({ password, email })
    },
  },
}
</script>

<style lang="scss">


</style>
