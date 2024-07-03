/* eslint-disable no-console */
import { $, semver } from 'bun'
import { z } from 'zod'

/**
 * Specified in order of dependency tree, e.g. kotti needs to be released last
 * in order to pick up releases of its dependencies that happen in the same process
 */
const packagesToConsider = [
	'packages/eslint-config',
	'packages/vue-use-tippy',
	'packages/yoco',
	'packages/kotti-ui',
]

const packageJsonSchema = z.object({ name: z.string(), version: z.string() })

const getRemoteVersion = async (name: string): Promise<string | null> => {
	try {
		return (await $`npm view ${name} version`.text()).trim()
	} catch {
		return null
	}
}

const packagesToPublish: string[] = []

for (const path of packagesToConsider) {
	const { name, version } = packageJsonSchema.parse(
		await Bun.file(`./${path}/package.json`).json(),
	)
	const remoteVersion = await getRemoteVersion(name)

	console.info(
		`${path}: found package “${name}@${version}”, remote is ${remoteVersion ?? 'LIKELY UNPUBLISHED'}`,
	)

	const shouldPublish =
		remoteVersion === null || semver.order(version, remoteVersion) === 1

	if (!shouldPublish) {
		console.info(`${path}: already up-to-date, skipping`)
		continue
	}

	console.info(`${path}: scheduled for publishing`)
	packagesToPublish.push(name)
}

if (packagesToPublish.length === 0) {
	console.warn(`nothing to publish, exiting.`)
	process.exit(0)
}

const filters = packagesToPublish
	.map((packageName) => `--filter=${packageName}`)
	.join(' ')

await $`yarn run turbo run build check test ${filters}`

console.info(`attempting to publish ${packagesToPublish.join(', ')}`)

for (const packageName of packagesToPublish) {
	await $`yarn run turbo run publish-package --continue --filter=${packageName}`
}
/* eslint-enable no-console */
