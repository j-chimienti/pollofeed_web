<template>
  <div class="login">
    <div class="login-triangle"></div>
    <h2 class="login-header">Log in</h2>
    <q-form class="login-container" @submit.prevent="login">
      <q-form-group
          id="input-group-username"
          label-for="input-email"
      >
        <q-form-input
            id="input-email"
            v-model="email"
            type="email"
            placeholder="Enter email"
            required
        ></q-form-input>
      </q-form-group>
      <q-form-group
          id="input-group-password"
          label-for="input-password"
      >
        <q-form-input
            id="input-password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            required
        ></q-form-input>
      </q-form-group>
      <q-btn type="submit" block color="primary">Log in</q-btn>
    </q-form>
  </div>
</template>

<script>


import {LOGIN} from "@/admin/store/actions";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() { return {password: "", email: ""}},
  methods: {
    ...mapActions([LOGIN]),
    login() {
      const {password, email} = this
      return this.LOGIN({password, email})
    }
  }
}
</script>

<style scoped>

/* 'Open Sans' font from Google Fonts */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);

.login {
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.login-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.login-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}


</style>
