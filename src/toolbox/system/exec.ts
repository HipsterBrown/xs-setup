import { type as platformType } from 'node:os'
import { system, print } from 'gluegun'
import { EXPORTS_FILE_PATH } from '../setup/constants'
import type { Device } from '../../types'

function ensureAskPass(): void {
  const SUDO_ASKPASS = system.which('ssh-askpass')
  if (SUDO_ASKPASS === null || SUDO_ASKPASS === undefined) {
    print.warning('ssh-askpass required to prompt for password')
    process.exit(1)
  }
  process.env.SUDO_ASKPASS = SUDO_ASKPASS
}

/**
 * Ensure command can be run with sudo,
 * first attempting as non-interactive before falling back to ssh-askpass prompt
 **/
export async function execWithSudo(
  command: string,
  options: Record<string, unknown> = {},
): Promise<void> {
  try {
    await system.exec(
      `sudo --non-interactive --preserve-env ${command}`,
      options,
    )
    return
  } catch (error) {
    if (error.toString().includes('password') === true) {
      ensureAskPass()
    } else {
      throw error as Error
    }
  }

  await system.exec(`sudo --askpass --preserve-env ${command}`, options)
}

export async function pkexec(
  command: string,
  options: Record<string, unknown> = {},
): Promise <void> {
  await system.exec(`pkexec ${command}`, options)
}

/**
 * Utility for updating in-memory process.env after running a command
 */
async function updateProcessEnv(command: string): Promise<void> {
  const OS = platformType().toLowerCase() as Device

  if (OS !== 'windows_nt') {
    try {
      const result = await system.spawn(`${command} && env`, {
        shell: process.env.SHELL,
      })
      if (
        typeof result.stdout === 'string' ||
        result.stdout instanceof Buffer
      ) {
        const localEnv = Object.fromEntries(
          (result.stdout.toString() as string)
            .split('\n')
            .map((field: string) => field?.split('=')),
        )
        if ('PATH' in localEnv) process.env = localEnv
      }
    } catch (error) {
      console.warn('Unable to update environment:', error)
    }
  }
}

/**
 * Set updated env from user shell as process.env
 */
export async function sourceEnvironment(): Promise<void> {
  await updateProcessEnv(`source ${EXPORTS_FILE_PATH}`)
}

/**
 * Set updated env from IDF_PATH/export.sh as process.env
 */
export async function sourceIdf(): Promise<void> {
  await updateProcessEnv(`source $IDF_PATH/export.sh 1> /dev/null`)
}

/**
 * Set updated env from IDF_PYTHON_ENV_PATH as process.env
 */
export async function sourceIdfPythonEnv(): Promise<void> {
  await updateProcessEnv(
    `source ${process.env.IDF_PYTHON_ENV_PATH ?? ''}/bin/activate`,
  )
}
