<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {RESUME_SESSION} from "@/admin/store/actions";

export default {
  name: 'AppAdmin',
  mounted() {
    this.$store.dispatch(RESUME_SESSION)

  },
}
</script>

<style>

</style>
