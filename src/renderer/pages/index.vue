<template>
  <h1>hello</h1>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  transition (_to, from) {
    if (from && from.path !== '/') {
      return 'slide-right'
    }
    return 'slide-left'
  }
})
</script>
