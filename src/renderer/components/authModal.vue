<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template #default="">
      <v-card>
        <v-toolbar
          color="secondary"
        >
          Add user
        </v-toolbar>
        <v-form v-model="valid" @submit="addUser()">
          <v-container>
            <v-row>
              <v-col>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  />
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    type="password"
                    required
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <p v-if="error" class="ml-3 error--text">{{ error }}</p>
            <div class="ml-auto">
              <v-btn type="submit" text :disabled="!valid">Submit</v-btn>
              <v-btn
                text
                @click="uiStore.TOGGLE_AUTH_MODAL()"
              >
                Close
              </v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { uiStore, usersStore } from '@/store'

export default Vue.extend({
  data () {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      email: '',
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password must be more than 8 characters'
      ],
      password: '',
      valid: false,
      error: '',
      uiStore
    }
  },
  computed: {
    visible: {
      get () {
        return uiStore.authModalVisible
      },
      set (value) {
        if (value !== uiStore.authModalVisible) uiStore.TOGGLE_AUTH_MODAL()
      }
    }
  },
  methods: {
    log (...vals: any[]) {
      console.log(...vals)
    },
    addUser () {
      usersStore.ADD_USER({ username: this.email, password: this.password })
        .then(() => {
          uiStore.TOGGLE_AUTH_MODAL()
          this.error = ''
        })
        .catch(err => {
          console.log(err)
          this.error = err.message
        })
    }
  }
})
</script>
