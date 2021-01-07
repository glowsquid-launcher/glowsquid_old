<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition (_to, from) {
    if (from && /instances\/[^/]+/.test(from.path)) {
      return 'slide-right'
    }
    return 'slide-left'
  }
})
</script>
