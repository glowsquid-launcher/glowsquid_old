<template>
  <div>
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <v-text-field
            label="instance name"
            :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
            :rules="nameRules"
            outlined
            :value="name"
            @input="(e) => name = e"
          />
        </v-col>
        <v-col>
          <v-select
            :items="versionsToShow"
            :loading="fetchState.pending"
            label="Select version"
            outlined
            :color="$vuetify.theme.dark ? 'grey-lighten-4' : 'grey-darken-3'"
            :value="version"
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
        <v-col class="mt-2">
          <v-btn :disabled="!valid" class="mr-2" @click="addInstance">Add Instance</v-btn>
          <v-btn @click="refresh">refresh</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-card v-for="instance in instances" :key="instance.name" class="mb-2 card-outter">
      <v-card-title>{{ instance.name }}</v-card-title>
      <v-card-subtitle>
        <!-- eslint-disable-next-line max-len <!-->
        Minecraft version: {{ instance.dependencies.minecraft }} | Fabric version: {{ instance.dependencies['fabric-loader'] }}
      </v-card-subtitle>
      <v-card-text>
        {{ instance.summary }}
      </v-card-text>

      <!-- We need 99% width because else the launch button will hit the side for some reason -->
      <v-card-actions
        class="card-actions grid-cols-2 gap-1 justify-center"
        style="display: grid !important; width: 99%;"
      >
        <v-btn block @click="$router.push({
          path: `/instances/${instance.name}`
        })"
        >
          about
        </v-btn>
        <v-btn block @click="launch(instance)">Launch</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import * as path from 'path'
import { computed, defineComponent, Ref, ref, useFetch } from '@nuxtjs/composition-api'
import { ipcRenderer, remote } from 'electron'
import { instanceStore, usersStore } from '@/store'
import { Client } from 'minecraft-launcher-core'
import FabricVersion from '../../../types/FabricVersion'
import FabricLoaderVersion from '../../../types/FabricLoaderVersion'
import Modpack from '~/../types/Modpack'
export default defineComponent({
  transition: 'slide-left',
  setup (_, { root }) {
    // version setup
    const loaderVersions: Ref<FabricLoaderVersion[]> = ref([])
    const versions: Ref<FabricVersion[]> = ref([])
    const showUnstable = ref(false)
    const versionsToShow = computed(() => {
      if (showUnstable.value) {
        return versions.value
      } else {
        return versions.value.filter(ver => ver.stable)
      }
    })
    const { fetchState } = useFetch(async () => {
      versions.value = (await root.$axios.get('https://meta.fabricmc.net/v2/versions/game')).data
      loaderVersions.value = (await root.$axios.get('https://meta.fabricmc.net/v2/versions/loader')).data
    })

    const instances = computed(() => instanceStore.instances)
    const refresh = () => instanceStore.REFRESH_INSTANCES()

    // form setup and validation
    const name = ref('')
    const version: Ref<FabricVersion> = ref({} as FabricVersion)
    const nameRules = [
      v => !!v || 'Name is required',
      v => !instances.value.find(val => val.name === v) || 'Instance already exists'
    ]
    const valid = ref(false)
    function addInstance () {
      instanceStore.ADD_INSTANCE({
        name: name.value,
        fabricVersion: loaderVersions.value[0].version,
        minecraftVersion: version.value.version
      })
    }

    ipcRenderer.send('updatePresence', {
      details: 'Looking at their instances 👀',
      state: 'Not signed in yet',
      startTimestamp: new Date(),
      largeImageKey: 'glowsquid',
      largeImageText: 'Coming not soon™'
    })

    function launch (instance: Modpack) {
      console.log(instance)
      const client = new Client()

      client.on('debug', e => console.log(e))
      client.on('data', e => console.log(e))
      client.on('download', e => console.log(e))
      client.on('download-status', e => console.log(e))

      client.launch({
        authorization: (async () => usersStore.selected)(),
        root: path.join(remote.app.getPath('userData'), 'instances', instance.name, '.minecraft'),
        version: {
          number: instance.dependencies.minecraft,
          type: 'release',
          custom: instance.dependencies.minecraft + 'fabric'

        },
        memory: {
          min: '4G',
          max: '4G'
        },
        overrides: {
          assetRoot: path.join(remote.app.getPath('userData'), 'assets')
        }
      })
    }

    return {
      versions,
      versionsToShow,
      fetchState,
      showUnstable,
      nameRules,
      valid,
      refresh,
      instances,
      name,
      version,
      addInstance,
      launch
    }
  }
})
</script>

<style lang="stylus">
.card-outter {
  position: relative
  padding-bottom: 50px
}
.card-actions {
  position: absolute
  bottom: 0
}
</style>
