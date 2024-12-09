import type { GluegunPrint } from 'gluegun'
import type { Dependency } from '../../system/types'
import { findMissingDependencies, installPackages } from '../../system/packages'

export async function installDeps(
  spinner: ReturnType<GluegunPrint['spin']>,
): Promise<void> {
  spinner.start('Installing python deps with apt-get')
  const dependencies: Dependency[] = [
    { name: 'pip', packageName: 'python-pip', type: 'binary' },
    { name: 'pyserial-miniterm', packageName: 'python3-serial', type: 'binary' },
    { name: 'python', packageName: 'python-is-python3', type: 'binary' },
  ]

  const missingDependencies = await findMissingDependencies(dependencies)
  if (missingDependencies.length !== 0) {
    await installPackages(missingDependencies)
  }
  spinner.succeed()
}
