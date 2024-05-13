/* eslint-disable no-console */
import { $, semver } from 'bun'
import { z } from 'zod'

const packagesToConsider = ['packages/yoco']

const packageJsonSchema = z.object({ name: z.string(), version: z.string() })

const getRemoteVersion = async (name: string): Promise<string | null> => {
	try {
		return (await $`npm view ${name} version`.text()).trim()
	} catch {
		return null
	}
}

const toPublish: string[] = []

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
	toPublish.push(name)
}

if (toPublish.length === 0) {
	console.warn(`nothing to publish, exiting.`)
	process.exit(0)
}

console.info(`attempting to publish ${toPublish.join(', ')}`)

// eslint-disable-next-line sonarjs/no-nested-template-literals
await $`yarn run turbo run publish-package --continue ${toPublish.map((packageName) => `--filter=${packageName}`).join(' ')}`
/* eslint-enable no-console */
