<template>
  <div>
    <h1 class="text-h4 text-center">this is mostly a test page, nothing to see here</h1>
    <v-btn @click="toast">
      toast
    </v-btn>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron'
export default {
  mounted () {
    ipcRenderer.send('updatePresence', {
      details: 'testing stuff',
      state: 'Not signed in yet',
      startTimestamp: new Date(),
      largeImageKey: 'glowsquid',
      largeImageText: 'Coming not soon™'
    })
  },
  methods: {
    toast () {
      this.$toast('yes')
    }
  }
}
</script>
