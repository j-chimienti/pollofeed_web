<template>
  <Login />
</template>

<script>
import Login from "components/Login"

export default {
  name: "LoginPage",
  components: { Login },
  mounted() {
    if (this.$store.getters.authenticated) this.$router.push({ name: "admin" })
  },
}
</script>

<style scoped></style>
