import ModFile from './ModFIle'

export default interface Modpack {
  formatVersion: 1
  versionId: string
  name: string
  summary?: string
  description?: string
  releaseDate?: string
  files: ModFile[]
  dependencies: {
    minecraft: string
    'fabric-loader'?: string
    forge?: string
  }
}
