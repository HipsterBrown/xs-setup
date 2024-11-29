import type { Dependency } from './types'
import { execWithSudo } from '../system/exec'
import { system } from 'gluegun'

/**
 * Check if the list of dependencies are installed on the system.
 **/
export async function findMissingDependencies(
  dependencies: Array<Dependency>,
): Promise<Array<Dependency>> {
  let missingDependencies: Array<Dependency> = []

  for (let dep of dependencies) {
    if (dep.type == 'binary') {
      if (system.which(dep.name) === null) {
        missingDependencies.push(dep)
      }
    } else {
      try {
        await system.run(`pkg-config --exists ${dep.name}`)
      } catch (error) {
        missingDependencies.push(dep)
      }
    }
  }

  return missingDependencies
}

/**
 * Attempt to install packages on the linux platform.
 **/
export async function installPackages(
  packages: Array<Dependency>,
): Promise<void> {
  await execWithSudo(
    `apt-get install --yes ${packages.map((p) => p.packageName).join(' ')}`,
    { stdout: process.stdout },
  )
}
