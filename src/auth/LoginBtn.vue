<template>
  <q-btn
    data-cy="loginBtn"
    icon="fa fa-user"
    :label="loginType"
    @click="$store.commit('LOGIN_MODAL_VISIBLE', true)"
    color="secondary"
  />
</template>

<script>
import AppMixin from "src/mixins/AppMixin"

export default {
  name: "LoginBtn",
  mixins: [AppMixin],
}
</script>

<style scoped></style>
