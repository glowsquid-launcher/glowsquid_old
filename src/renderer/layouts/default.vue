<template>
  <section>
    <v-app>
      <app-header />
      <nuxt class="ml-2" />
    </v-app>
  </section>
</template>

<script lang="ts">
import appHeader from '@/components/header.vue'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  components: { appHeader }
})
</script>

<style>
body {
  margin: 0 !important;
}
</style>
