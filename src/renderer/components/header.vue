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
      <v-spacer />
      <v-select
        :items="accounts"
        label="Account"
        color="primary"
        class="mt-6"
        @input="(e) => $accessor.users.SET_USER($accessor.users.users.indexOf(e))"
      >
        <template #item="{ item }">
          <v-img
            :max-height="32"
            :max-width="32"
            :src="`https://minotar.net/avatar/${item.uuid}`"
            class="mr-3 rounded-sm"
          />
          <span class="secondary--text">{{ item.name }}</span>
          <v-btn
            class="ml-auto mr-0"
            @click="$accessor.users.REMOVE_USER($accessor.users.users.indexOf(item))"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <template #selection="{ item }">
          <v-img
            :max-height="32"
            :max-width="32"
            :src="`https://minotar.net/avatar/${item.uuid}`"
            class="mr-3 rounded-sm"
          />
          <span class="white--text">{{ item.name }}</span>
        </template>
        <template #append-item>
          <v-divider class="mb-2" />
          <v-list-item>
            <v-list-item-avatar>
              <v-btn @click="$accessor.ui.TOGGLE_AUTH_MODAL()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                Add account
              </v-list-item-title>
              <v-list-item-subtitle>
                Go ahead, add another account or your first one!
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
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
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path) => {
        breadcrumbArray.push({
          path,
          to: `${breadcrumbArray.reduce((prev, val) => {
            return `${prev}/${val.path}`
          }, '')}/${path}`,
          text: path === '' ? 'Home' : path
        })
        return breadcrumbArray
      }, [] as {path: string; to: string; text: string}[])

      return breadcrumbs
    },
    sidebarVisible: {
      get () { return this.$accessor.ui.sidebarVisible },
      set () { this.$accessor.ui.TOGGLE_SIDEBAR() }
    },
    accounts () {
      return this.$accessor.users.users
    }
  },
  methods: {
    log (...vals: any[]) {
      console.log(...vals)
    }
  }
})
</script>
