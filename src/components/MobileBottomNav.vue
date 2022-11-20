<template>
  <div>
    <q-tabs v-model="tab" class="text-teal">
      <q-tab>
        <Logo :width="65" />
      </q-tab>
      <q-tab name="mails">
        <LoginBtn v-if="!authenticated" />
        <LogoutBtn v-else />
      </q-tab>
    </q-tabs>
  </div>
</template>

<script>
import LoginBtn from "src/auth/LoginBtn"
import LogoutBtn from "src/auth/LogoutBtn"
import AppMixin from "src/mixins/AppMixin"
import Logo from "components/Logo"
export default {
  name: "MobileBottomNav",
  mixins: [AppMixin],
  components: { Logo, LogoutBtn, LoginBtn },
}
</script>

<style scoped></style>
