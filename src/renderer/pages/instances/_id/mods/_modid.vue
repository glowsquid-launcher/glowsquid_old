<template>
  <div>
    {{ mod }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Mod from '../../../../../types/Mod'
export default defineComponent({
  transition: 'slide-left',
  data () {
    return {
      mod: {} as Mod
    }
  },
  async fetch () {
    this.mod = await fetch(`https://api.modrinth.com/api/v1/mod/${this.$route.params.modid}`).then(res =>
      res.json()
    )
  }
})
</script>
