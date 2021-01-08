<template>
  <v-app>
    <app-header />
    <nuxt class="ml-2" />
  </v-app>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader }
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
