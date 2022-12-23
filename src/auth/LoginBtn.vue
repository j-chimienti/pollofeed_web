<template>
  <q-btn
    data-cy="loginBtn"
    icon="fa fa-user"
    @click="$store.commit('LOGIN_MODAL_VISIBLE', true)"
    color="secondary"
    >{{ loginType }}</q-btn
  >
</template>

<script>
import AppMixin from "src/mixins/AppMixin"

export default {
  name: "LoginBtn",
  mixins: [AppMixin],
}
</script>

<style scoped></style>
