<template>
  <v-app>
    <app-header />
    <nuxt />
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
