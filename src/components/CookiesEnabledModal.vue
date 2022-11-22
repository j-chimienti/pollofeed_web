<template>
  <q-dialog persistent v-model="cookiesEnabled">
    <q-card>
      <div style="font-size: 18px; background-color: rgba(255, 69, 0, 0.8)">
        <p class="my-4">Cookies must be enabled</p>
      </div>
      <ul>
        <li>
          <a
            href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en"
            target="_blank"
            >Chrome Instructions</a
          >
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            target="_blank"
            >FireFox Instructions</a
          >
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
            target="_blank"
            >Internet Explorer Instructions</a
          >
        </li>
        <li>
          <a
            href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=en"
            target="_blank"
            >Safari Instructions</a
          >
        </li>
      </ul>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "CookiesEnabledModal",
  computed: {
    cookiesEnabled() {
      return !navigator.cookieEnabled
    },
  },
}
</script>
<style scoped>
@media all and (max-width: 500px) {
}
</style>
