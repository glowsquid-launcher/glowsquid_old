<template>
  <div class="container">
    <div v-if="error.statusCode === 404">
      <h1>Page not found</h1>
      <p>{{ error.message }}</p>
    </div>
    <div v-else>
      <h1>An error occurred</h1>
    </div>
    <nuxt-link :to="localePath('/')">Home page</nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  layout: 'default',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
