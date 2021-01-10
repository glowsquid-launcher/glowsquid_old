<template>
  <div v-if="modList.hits" class="grid grid-cols-3 gap-2">
    <v-card v-for="mod in modList.hits" :key="mod.mod_id" tile>
      <v-card-title> {{ mod.title }}</v-card-title>
      <v-card-subtitle> {{ mod.author }}</v-card-subtitle>
      <v-card-text> {{ mod.description }}</v-card-text>
      <v-card-actions>
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
