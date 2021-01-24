import path from 'path'
import { remote } from 'electron'
import { Client } from 'minecraft-launcher-core'
import { usersStore } from './store-accessor'
import Modpack from '~/../types/Modpack'

export default async function launch (instance: Modpack | null) {
  if (!instance) return
  console.log(instance)
  const client = new Client()

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
      assetRoot: instance.extras?.overrides?.assetRoot ?? path.join(remote.app.getPath('userData'), 'assets')
    }
  }).then(() => {
    remote.BrowserWindow.getFocusedWindow()?.hide()
    client.emit('download-status', null)
  })

  client.on('close', () => remote.BrowserWindow.getFocusedWindow()?.show())
  return client
}
