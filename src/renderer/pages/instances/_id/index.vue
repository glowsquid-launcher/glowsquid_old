<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition (_to, from) {
    if (from && from.path !== '/') {
      return 'slide-right'
    }
    return 'slide-left'
  },
  head () {
    return {
      title: this.title,
      meta: [{
        breadCrumb: this.$route.params.id
      }]
    }
  }
})
</script>
