<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon @click="sidebarVisible = !sidebarVisible" />
      <v-toolbar-title> Glowsquid </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="sidebarVisible" absolute temporary>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push({
            path: item.path
          })"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="$router.push({
            path: '/settings'
          })"
          >
            Settings
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data () {
    return {
      sidebarVisible: false,
      items: [{
        title: 'Home',
        icon: 'mdi-home',
        path: '/'
      }] as {title: string, icon: string, path: string}[]
    }
  }
})
</script>
