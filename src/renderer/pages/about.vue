<template>
  <div>
    <v-btn color="primary" @click="toast"> toast </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  transition: 'slide-left',
  methods: {
    toast () {
      this.$toast('yes')
    }
  }
})
</script>
