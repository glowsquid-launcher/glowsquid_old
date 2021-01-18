/* eslint-disable max-len */
import { promises as fs, existsSync } from 'fs'
import * as path from 'path'
import { store } from '@/plugins/store'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { mkdir } from 'shelljs'
import { remote } from 'electron'
import axios from 'axios'
import Modpack from '../../types/Modpack'
type AddInstanceType = {name: string, fabricVersion: string, minecraftVersion: string}
@Module({
  name: 'instances',
  stateFactory: true,
  namespaced: true
})
export default class InstancesModule extends VuexModule {
  instances: Modpack[] = store.get('instances', [])

  @Mutation
  PUSH_INSTANCE (instance: Modpack) {
    this.instances.push(instance)
    store.set('instances', this.instances)
  }

  @Mutation
  READD_INSTANCES (instances: Modpack[]) {
    this.instances = instances
    store.set('instances', this.instances)
  }

  @Action
  async ADD_INSTANCE ({ name, fabricVersion, minecraftVersion }: AddInstanceType) {
    const version: Modpack = {
      name,
      summary: 'no summary yet',
      description: 'no description yet',
      versionId: '0.0.1',
      releaseDate: new Date().toISOString(),
      formatVersion: 1,
      dependencies: {
        minecraft: minecraftVersion,
        'fabric-loader': fabricVersion
      },
      files: []
    }

    mkdir('-p', path.join(remote.app.getPath('userData'), 'instances', name, '.minecraft', 'versions', minecraftVersion + 'fabric'))
    mkdir('-p', path.join(remote.app.getPath('userData'), 'instances', name, '.minecraft', 'mods'))
    const content = JSON.stringify((await axios.get(`https://fabricmc.net/download/technic?yarn=${minecraftVersion}%2Bbuild.1&loader=0.11.1`)).data)
    await fs.writeFile(
      path.join(remote.app.getPath('userData'), 'instances', name, 'instance.json'),
      JSON.stringify(version))
    await fs.writeFile(path.join(remote.app.getPath('userData'), 'instances', name, '.minecraft', 'versions', minecraftVersion + 'fabric', minecraftVersion + 'fabric.json'),
      content)

    this.context.commit('PUSH_INSTANCE', version)
  }

  @Action
  async REFRESH_INSTANCES () {
    const userData = remote.app.getPath('userData')
    // fs.stat breaks for some reason
    if (!existsSync(path.join(userData, 'instances'))) mkdir('-p', path.join(userData, 'instances'))

    const instancePaths = (await fs.readdir(path.join(userData, 'instances'), { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(userData, 'instances', dirent.name, 'instance.json'))

    this.context.commit('READD_INSTANCES', await Promise.all(instancePaths.map(async instancePath =>
      JSON.parse((await fs.readFile(instancePath)).toString('utf-8'))
    )))
  }
}
