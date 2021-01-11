<template>
  <section>
    <v-app color="primary">
      <app-header />
      <auth-modal />
      <nuxt class="ml-2 mr-2" />
    </v-app>
  </section>
</template>

<script lang="ts">
import appHeader from '@/components/header.vue'
import authModal from '@/components/authModal.vue'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: { appHeader, authModal }
})
</script>

<style>
body {
  margin: 0 !important;
}
</style>
