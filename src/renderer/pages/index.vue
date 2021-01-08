<template>
  <h1>hello</h1>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  transition: 'slide-left',
  head () {
    return {
      title: this.title,
      meta: [{
        breadCrumb: 'home'
      }]
    }
  }
})
</script>
