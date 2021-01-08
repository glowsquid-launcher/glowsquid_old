<template>
  <div>
    <v-btn @click="toast" color="primary"> toast </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition (_to, from) {
    if (from && from.path !== '/about') {
      return 'slide-right'
    }
    return 'slide-left'
  },
  methods: {
    toast () {
      this.$toast('yes')
    }
  }
})
</script>
