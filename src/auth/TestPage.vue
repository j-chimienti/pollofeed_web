<template>
  <div>
    <LoginBtn/>
    <Login/>
    <SocialAuth/>
  </div>
</template>

<script>
  import Login from "./Login"
  import LoginBtn from "./LoginBtn"
  import SocialAuth from "./SocialAuth"
  import { RESUME_SESSION } from "./actions"
  export default {
    name: "TestPage",
    components: { SocialAuth, LoginBtn, Login },
    mounted() {
      this.$store.dispatch(RESUME_SESSION)
    }
  }
</script>

<style scoped>

</style>
