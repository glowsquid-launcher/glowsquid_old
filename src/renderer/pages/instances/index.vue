<template>
  <div>
    <NuxtLink to="/instances/test">test</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ipcRenderer } from 'electron'
export default defineComponent({
  transition: 'slide-left',
  setup () {
    ipcRenderer.send('updatePresence', {
      details: 'Looking at their instances 👀',
      state: 'Not signed in yet',
      startTimestamp: new Date(),
      largeImageKey: 'glowsquid',
      largeImageText: 'Coming not soon™'
    })
  }
})
</script>
