import type { Dependency } from './types'
import { execWithSudo } from '../system/exec'
import { print, system } from 'gluegun'

/**
 * Check if the list of dependencies are installed on the system.
 **/
export async function findMissingDependencies(dependencies: Dependency[]): Promise<Dependency[]> {
  const missingDependencies: Dependency[] = []

  for (const dep of dependencies) {
    if (dep.type == 'binary') {
      if (system.which(dep.name) === null) {
        missingDependencies.push(dep)
      }
    }
    if (dep.type == 'library') {
      try {
        await system.run(`pkg-config --exists ${dep.name}`)
      } catch (error) {
        missingDependencies.push(dep)
      }
    }
    if (dep.type == 'pylib') {
      try {
        await system.run(`pip3 info %{dep.name}`)
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
export async function installPackages(packages: Dependency[]): Promise<void> {
  const packageManager = system.which('apt')

  if (packageManager !== null && packageManager !== undefined) {
    await execWithSudo(
      `${packageManager} install --yes ${packages.map((p) => p.packageName).join(' ')}`,
      { stdout: process.stdout },
    )
  } else {
    print.warning(
      'xs-dev attempted to install dependencies, but your Linux distribution is not yet supported',
    )
    print.warning(
      `Please install these dependencies before running this command again: ${packages.map((p) => p.packageName).join(', ')}`,
    )
    process.exit(1)
  }
}
