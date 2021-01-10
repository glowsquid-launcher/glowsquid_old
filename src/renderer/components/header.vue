<template>
  <div class="mb-2">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon @click="sidebarVisible = !sidebarVisible" />
      <v-toolbar-title> Glowsquid </v-toolbar-title>
      <v-breadcrumbs :items="crumbs">
        <template #item="{ item }">
          <v-breadcrumbs-item>
            <NuxtLink :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" :to="`${item.to}`">
              {{ item.text[0].toUpperCase() + item.text.slice(1) }}
            </NuxtLink>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-toolbar>
    <NavDrawer :items="items" />
  </div>
</template>

<script lang="ts">
import NavDrawer from '@/components/navDrawer.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    NavDrawer
  },
  data () {
    return {
      items: [{
        title: 'Home',
        icon: 'mdi-home',
        path: '/'
      },
      {
        title: 'About',
        icon: 'mdi-information',
        path: '/about'
      },
      {
        title: 'instances',
        icon: 'mdi-package-variant-closed',
        path: '/instances'
      }] as {title: string, icon: string, path: string}[]
    }
  },
  computed: {
    crumbs () {
      const pathArray: string[] = this.$route.path.split('/')
      pathArray.shift()
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path,
          to: breadcrumbArray[idx - 1]
            ? '/' + breadcrumbArray[idx - 1].path + '/' + path
            : '/' + path,
          text: path === '' ? 'Home' : path
        })
        return breadcrumbArray
      }, [] as {path: string; to: string; text: string}[])
      return breadcrumbs
    },
    sidebarVisible: {
      get () { return this.$accessor.ui.sidebarVisible },
      set () { this.$accessor.ui.TOGGLE_SIDEBAR() }
    }
  }
})
</script>
