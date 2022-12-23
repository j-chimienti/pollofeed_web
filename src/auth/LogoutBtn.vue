<template>
  <q-btn
    data-cy="logoutBtn"
    @click="$store.dispatch('LOGOUT')"
    color="secondary"
    :label="'logout ' + email"
  >
  </q-btn>
</template>

<script>
import AppMixin from "../mixins/AppMixin"

export default {
  name: "LogoutBtn",
  mixins: [AppMixin],
}
</script>

<style scoped></style>
