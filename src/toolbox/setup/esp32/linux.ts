import type { GluegunPrint } from 'gluegun'
import type { Dependency } from '../../system/types'
import { findMissingDependencies, installPackages } from '../../system/packages'

export async function installDeps(
  spinner: ReturnType<GluegunPrint['spin']>,
): Promise<void> {
  const dependencies: Array<Dependency> = [
    { name: 'bison', packageName: 'bison', type: 'binary' },
    { name: 'ccache', packageName: 'ccache', type: 'binary' },
    { name: 'cmake', packageName: 'cmake', type: 'binary' },
    { name: 'dfu-util', packageName: 'dfu-util', type: 'binary' },
    { name: 'flex', packageName: 'flex', type: 'binary' },
    { name: 'git', packageName: 'git', type: 'binary' },
    { name: 'gperf', packageName: 'gperf', type: 'binary' },
    { name: 'libffi', packageName: 'libffi-dev', type: 'library' },
    { name: 'libssl', packageName: 'libssl-dev', type: 'library' },
    { name: 'ninja', packageName: 'ninja-build', type: 'binary' },
    { name: 'pip', packageName: 'python-pip', type: 'binary' },
    { name: 'pyserial-miniterm', packageName: 'python3-serial', type: 'binary' },
    { name: 'python', packageName: 'python-is-python3', type: 'binary' },
    { name: 'setuptools', packageName: 'python3-setuptools', type: 'pylib' },
    { name: 'wget', packageName: 'wget', type: 'binary' },
  ]

  const missingDependencies = await findMissingDependencies(dependencies)
  if (missingDependencies.length !== 0) {
    await installPackages(missingDependencies)
  }
  spinner.succeed()
}
