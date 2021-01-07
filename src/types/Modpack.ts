import ModFile from './ModFIle'

export default interface Modpack {
  formatVersion: 1
  versionId: string
  name: string
  summary: string | null
  description: string | null
  releaseDate: string | null
  files: ModFile[]
  dependencies: {
    minecraft: string
    'fabric-loader': string | null
    forge: string | null
  }
}
