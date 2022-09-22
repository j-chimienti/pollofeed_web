<template>
  <div>
    <LoginBtn/>
    <Login/>
    <SocialAuth/>
  </div>
</template>

<script>
  import Login from "../components/Login"
  import LoginBtn from "./LoginBtn"
  import SocialAuth from "./SocialAuth"
  export default {
    name: "TestPage",
    components: { SocialAuth, LoginBtn, Login }
  }
</script>

<style scoped>

</style>
