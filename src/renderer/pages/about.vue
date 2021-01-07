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
  }
})
</script>
