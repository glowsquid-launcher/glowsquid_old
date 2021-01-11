<template>
  <section>
    <v-app color="primary">
      <app-header />
      <auth-modal />
      <settings-dialog />
      <nuxt class="ml-2 mr-2" />
    </v-app>
  </section>
</template>

<script lang="ts">
import appHeader from '@/components/header.vue'
import authModal from '@/components/authModal.vue'
import settingsDialog from '@/components/settingsDialog.vue'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: { appHeader, authModal, settingsDialog }
})
</script>

<style>
body {
  margin: 0 !important;
}
</style>
