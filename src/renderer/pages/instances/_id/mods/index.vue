<template>
  <div v-if="modList.hits">
    {{ modList.hits.map(mod => mod.title).join(', ') }}
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
