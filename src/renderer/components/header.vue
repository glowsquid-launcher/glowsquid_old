<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon @click="sidebarVisible = !sidebarVisible" />
      <v-toolbar-title> Glowsquid </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="sidebarVisible" absolute left temporary>
      test
    </v-navigation-drawer>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data () {
    return {
      sidebarVisible: false
    }
  }
})
</script>
