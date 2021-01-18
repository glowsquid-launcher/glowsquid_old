<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list
        three-line
        subheader
      >
        <v-subheader>User Controls</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>test</v-list-item-title>
            <v-list-item-subtitle>test</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list
        three-line
        subheader
      >
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>test</v-list-item-title>
            <v-list-item-subtitle>test</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { uiStore } from '@/store'
export default Vue.extend({
  computed: {
    dialog: {
      get () {
        return uiStore.settingsVisible
      },
      set (val) {
        if (val !== uiStore.settingsVisible) uiStore.TOGGLE_SETTINGS()
      }
    }
  }
})
</script>
