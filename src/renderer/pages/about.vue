<template>
  <div>
    <v-btn @click="toast"> toast </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  methods: {
    toast () {
      this.$toast('yes')
    }
  },
  transition (_to, from) {
    if (from && from.path !== '/') {
      return 'slide-right'
    }
    return 'slide-left'
  }
})
</script>
