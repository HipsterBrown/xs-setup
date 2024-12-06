export interface Dependency {
  name: string
  packageName: string
  type: 'binary' | 'library' | 'pylib'
}
