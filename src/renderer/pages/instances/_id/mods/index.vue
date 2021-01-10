<template>
  <div
    v-if="modList.hits"
    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
  >
    <v-card v-for="mod in modList.hits" :key="mod.mod_id" height="100%" class="card-outter">
      <v-card-title class="flex flex-row mb-2">
        <v-img :max-height="32" :max-width="32" :src="mod.icon_url" class="mr-3 rounded-sm" />
        <p class="h-full ma-0 align-middle">{{ mod.title }}</p>
      </v-card-title>
      <v-card-subtitle>by {{ mod.author }}</v-card-subtitle>
      <v-card-text> {{ mod.description }}</v-card-text>

      <!-- We need 98% width because else the install button will hit the side for some reason -->
      <v-card-actions
        class="card-actions grid-cols-2 gap-1 justify-center"
        style="display: grid !important; width: 98%;"
      >
        <v-btn block>about</v-btn>
        <v-btn block>install</v-btn>
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
