<template>
  <div>
    <NuxtLink to="/instances/test">test</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition: 'slide-left'
})
</script>
