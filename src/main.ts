import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as io from '@actions/io'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const pattern = core.getInput('pattern') || '*.json'

    const globber = await glob.create(pattern)
    const renovateJson = 'renovate.json'
    for await (const file of globber.globGenerator()) {
      core.info(`Validating ${file} ...`)
      if (!file.includes(renovateJson)) {
        await io.cp(file, renovateJson)
      }
      const code = await exec.exec('npx', [
        '--package',
        'renovate',
        '-c',
        `'renovate-config-validator'`
      ])
      if (code !== 0) {
        core.setFailed(`${file} not valid`)
      }
      if (!file.includes(renovateJson)) {
        await io.rmRF(renovateJson)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('failed with unknown error')
    }
  }
}

run()
