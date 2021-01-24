<template>
  <div>
    <transition name="slide-y-transition" appear duration="100">
      <v-hover v-if="!leaving">
        <template #default="{ hover }">
          <v-card :elevation="hover ? 12 : 6" class="pa-4 transition" color="secondary">
            <h1 class="text-center">Welcome to Glowsquid.</h1>
          </v-card>
        </template>
      </v-hover>
    </transition>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron'

export default {
  beforeRouteLeave (_, _2, next) {
    this.leaving = true
    setTimeout(() => {
      next()
    }, 100)
  },
  data () {
    return {
      leaving: false
    }
  },
  mounted () {
    ipcRenderer.send('updatePresence', {
      details: 'Looking around 👀',
      state: 'Not signed in yet',
      startTimestamp: new Date(),
      largeImageKey: 'glowsquid',
      largeImageText: 'Coming not soon™'
    })
  }
}
</script>
