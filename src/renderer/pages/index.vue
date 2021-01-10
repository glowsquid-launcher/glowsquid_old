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
import { ipcRenderer } from 'electron'

export default defineComponent({
  transition: 'slide-left',
  setup () {
    ipcRenderer.send('updatePresence', {
      details: 'Looking around 👀',
      state: 'Not signed in yet',
      startTimestamp: new Date(),
      largeImageKey: 'glowsquid',
      largeImageText: 'Coming not soon™'
    })
  }
})
</script>
