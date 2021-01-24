<template>
  <v-dialog
    v-model="visible"
    transition="dialog-bottom-transition"
    max-width="600"
    @submit="addInstance()"
  >
    <v-card>
      <v-toolbar
        color="secondary"
      >
        {{ idx === 0 ? 'Setup instance' : idx === 1 ? 'Select template' : 'Extra settings' }}
      </v-toolbar>
      <v-form v-model="valid" @submit="addInstance()">
        <v-container>
          <v-item-group
            v-model="idx"
            class="w-full flex justify-center"
            mandatory
            tag="v-flex"
          >
            <v-item
              v-for="n in pages"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <div>
                <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>

          <v-window
            v-model="idx"
            class="elevation-1"
          >
            <v-window-item class="mt-3">
              <v-row>
                <v-text-field
                  label="instance name"
                  :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                  :rules="nameRules"
                  :value="name"
                  class="mr-6 ml-6"
                  @input="(e) => name = e"
                />
              </v-row>
              <v-row>
                <v-col>
                  <v-col>
                    <v-select
                      :items="versionsToShow"
                      label="Select version"
                      :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                      :value="version"
                      :rules="versionRules"
                      @input="(e) => version = e"
                    >
                      <template #item="{ item }">
                        <p :class="[$vuetify.theme.dark ? 'white--text' : 'black--text']">{{ item.version }}</p>
                      </template>
                      <template #selection="{ item }">
                        <p class="mt-2 ml-1"> {{ item.version }}</p>
                      </template>
                      <template #prepend-item>
                        <v-checkbox v-model="showUnstable" class="ml-2" label="Show unstable versions" />
                      </template>
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      :items="loaderVersions"
                      label="Select fabric version"
                      :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                      :value="loaderVersion"
                      :rules="loaderVersionRules"
                      @input="(e) => loaderVersion = e"
                    >
                      <template #item="{ item }">
                        <p :class="[$vuetify.theme.dark ? 'white--text' : 'black--text']">{{ item.version }}</p>
                      </template>
                      <template #selection="{ item }">
                        <p class="mt-2 ml-1"> {{ item.version }}</p>
                      </template>
                    </v-select>
                  </v-col>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item>
              Soon™
            </v-window-item>
            <v-window-item>
              <h1 class="text-md">Ram settings</h1>
              <div class="grid grid-cols-2 gap-2">
                <v-text-field
                  v-model="ram.min"
                  :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                  label="Min ram"
                  hint="Min ram for minecraft instance"
                />
                <v-text-field
                  v-model="ram.max"
                  :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                  label="Max ram"
                  hint="Max ram for minecraft instance"
                />
              </div>
              <v-divider class="mb-2 mt-2" />
              <h1 class="text-md">Random stuff</h1>
              <v-text-field
                v-model="assetRoot"
                :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
                label="asset root"
                hint="Where minecraft assets are stored. You shouldn't need to change this. Leave blank for default"
                class="mb-2"
              />
            </v-window-item>
          </v-window>
        </v-container>
        <v-container>
          <v-card-actions>
            <p v-if="error" class="ml-3 error--text">{{ error }}</p>
            <div class="ml-auto">
              <v-btn type="submit" text :disabled="!valid">Submit</v-btn>
              <v-btn
                text
                @click="visible = false"
              >
                Close
              </v-btn>
            </div>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { instanceStore, uiStore } from '@/store'
import FabricVersion from '@/../types/FabricVersion'
import FabricLoaderVersion from '@/../types/FabricLoaderVersion'

export default {
  data () {
    return {
      version: {} as FabricVersion,
      versions: [] as FabricVersion[],
      loaderVersions: [] as FabricLoaderVersion[],
      loaderVersion: {} as FabricLoaderVersion,
      showUnstable: false,
      name: '',
      valid: false,
      error: '',
      pages: 3,
      idx: 0,
      versionRules: [
        v => v !== {} || 'please select a version'
      ],
      loaderVersionRules: [
        v => v !== {} || 'please select a loader version'
      ],
      ram: {
        min: '4G',
        max: '6G'
      },
      assetRoot: undefined as string | undefined
    }
  },
  async fetch ({ $axios }) {
    this.versions = await $axios.$get('https://meta.fabricmc.net/v2/versions/game')
    this.version = (await $axios.$get('https://meta.fabricmc.net/v2/versions/game')).filter(v => v.stable)[0]
    this.loaderVersions = await $axios.$get('https://meta.fabricmc.net/v2/versions/loader')
    this.loaderVersion = (await $axios.$get('https://meta.fabricmc.net/v2/versions/loader'))[0]
    console.log(this.$data)
  },
  computed: {
    versionsToShow () {
      if (this.showUnstable) {
        return this.versions
      } else {
        return this.versions.filter(ver => ver.stable)
      }
    },
    visible: {
      get () {
        return uiStore.addInstanceVisible
      },
      async set (val) {
        this.versions = await this.$axios.$get('https://meta.fabricmc.net/v2/versions/game')
        this.version = (await this.$axios.$get('https://meta.fabricmc.net/v2/versions/game')).filter(v => v.stable)[0]
        this.loaderVersions = await this.$axios.$get('https://meta.fabricmc.net/v2/versions/loader')
        this.loaderVersion = await this.$axios.$get('https://meta.fabricmc.net/v2/versions/loader')[0]
        if (val === false) uiStore.TOGGLE_ADD_INSTANCE_MODAL()
      }
    },
    instances () {
      return instanceStore.instances
    },
    nameRules () {
      return [
        v => !!v || 'Name is required',
        // @ts-ignore
        v => !this.instances.find(val => val.name === v) || 'Instance already exists'
      ]
    }
  },
  methods: {
    addInstance () {
      instanceStore.ADD_INSTANCE({
        name: this.name,
        fabricLoader: this.version,
        fabricLoaderVersion: this.loaderVersion,
        ram: this.ram,
        assetRoot: this.assetRoot ? this.assetRoot : undefined
      }).catch(err => { this.error = err })
    }
  }
}
</script>
