<template>
  <q-dialog v-model="loginModalVisible">
    <Login/>
  </q-dialog>

</template>

<script>
  import Login from "./Login"
  import { mapMutations } from "vuex"
  import { LOGIN_MODAL_VISIBLE } from "./mutations"
  export default {
    name: "LoginModal",
    components: { Login },
    methods: {
      ...mapMutations([ LOGIN_MODAL_VISIBLE]),
    },
    computed: {
      loginModalVisible: {
        get() {
          return this.$store.getters.loginModalVisible
        },
        set(v) {
          this.LOGIN_MODAL_VISIBLE(v)
        },
      },
    }
  }
</script>

<style scoped>

</style>
