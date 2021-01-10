<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card :elevation="hover ? 12 : 6" class="pa-4 transition" color="primary">
        <h1 class="text-center">Welcome to Glowsquid.</h1>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  transition: 'slide-left'
})
</script>
