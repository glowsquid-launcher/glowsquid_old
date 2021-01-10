<template>
  <v-navigation-drawer v-model="sidebarVisible" absolute temporary color="primary" style="height: 100vh;">
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

    <template #append>
      <div class="grid grid-cols-3 gap-2 ma-2">
        <v-btn class="col-span-2" block @click="$router.push({
          path: '/settings'
        })"
        >
          Settings
        </v-btn>
        <v-btn block @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>{{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  transition: 'slide-left',
  props: {
    items: {
      type: Array as PropType<{title: string, icon: string, path: string}[]>,
      required: true
    }
  },
  setup (_props, { root }) {
    const sidebarVisible = computed({
      get: () => root.$accessor.ui.sidebarVisible,
      set: val => {
        if (val !== root.$accessor.ui.sidebarVisible) { root.$accessor.ui.TOGGLE_SIDEBAR() }
      }
    })
    const toggleSidebar = () => root.$accessor.ui.TOGGLE_SIDEBAR()
    return {
      sidebarVisible,
      toggleSidebar
    }
  }
})
</script>
