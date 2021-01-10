<template>
  <div
    v-if="modList.hits"
    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
  >
    <v-card v-for="mod in modList.hits" :key="mod.mod_id" tile height="100%" class="card-outter">
      <v-card-title class="flex flex-row">
        <v-img :max-height="32" :max-width="32" :src="mod.icon_url" class="mr-3" />
        <p class="h-full ma-0 align-middle">{{ mod.title }}</p>
      </v-card-title>
      <v-card-subtitle> {{ mod.author }}</v-card-subtitle>
      <v-card-text> {{ mod.description }}</v-card-text>
      <v-card-actions class="card-actions">
        <v-btn>about</v-btn>
        <v-btn>install</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ModList from '../../../../../types/ModList'
export default defineComponent({
  transition: 'slide-left',
  data () {
    return {
      modList: {} as ModList
    }
  },
  async fetch () {
    this.modList = await fetch('https://api.modrinth.com/api/v1/mod').then(res =>
      res.json()
    )
  }
})
</script>

<style lang="stylus">
.card-outter {
  position: relative
  padding-bottom: 50px
}
.card-actions {
  position: absolute
  bottom: 0
}
</style>
