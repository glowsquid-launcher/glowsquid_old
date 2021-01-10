<template>
  <div>
    <NuxtLink :to="`/instances/${$route.params.id}/mods`">to mods</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition: 'slide-left'
})
</script>
