<template>
  <div class="mb-2">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon @click="sidebarVisible = !sidebarVisible" />
      <v-toolbar-title> Glowsquid </v-toolbar-title>
      <v-breadcrumbs :items="crumbs">
        <template #item="{ item }">
          <v-breadcrumbs-item>
            <NuxtLink class="white--text" :to="`/${item.path}`">
              {{ item.text }}
            </NuxtLink>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-toolbar>
    <v-navigation-drawer v-model="sidebarVisible" absolute temporary color="primary">
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
          text: this.$router.resolve({
            path
          }).route.meta.breadCrumb || path
        })
        return breadcrumbArray
      }, [] as {path: string; to: string; text: string}[])
      return breadcrumbs
    }
  }
})
</script>
