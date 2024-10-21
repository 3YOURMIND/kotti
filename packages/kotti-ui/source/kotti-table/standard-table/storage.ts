import { z } from 'zod'

import { simpleHash } from './simple-hash'

export const serializableStateSchema = z
	.object({
		appliedFilters: z.any(), // TODO: use filtersSchema,
		columnOrder: z.array(z.string()),
		hiddenColumns: z.array(z.string()),
		ordering: z.array(
			z
				.object({
					id: z.string(),
					value: z.enum(['ascending', 'descending']),
				})
				.strict(),
		),
		pagination: z
			.object({
				pageIndex: z.number(),
				pageSize: z.number(),
			})
			.strict(),
		searchValue: z.string().nullable(),
	})
	.strict()

type SerializableState = z.output<typeof serializableStateSchema>

export interface KottiStandardTableStorage {
	load(context: StorageOperationContext): Promise<SerializableState | null>
	save(
		state: SerializableState,
		context: StorageOperationContext,
	): Promise<void>
}

// TODO: Example Storage Adapters, should be moved out

/**
 * @knipignore
 */
export class DummyStorageAdapter implements KottiStandardTableStorage {
	// eslint-disable-next-line @typescript-eslint/require-await
	async load(): Promise<SerializableState | null> {
		return null
	}

	async save(): Promise<void> {}
}

const localStorageSchema = z
	.object({ state: z.unknown(), version: z.string() })
	.strict()

export type StorageOperationContext = {
	/**
	 * Used for column hashing in {@link LocalStorageAdapter}
	 */
	columnIds: string[]
	// TODO: filters maybe?
}

export class LocalStorageAdapter implements KottiStandardTableStorage {
	#manualVersion: string | null
	#storageKey: string

	constructor(key: string, manualVersion: string | null = null) {
		this.#storageKey = key
		this.#manualVersion = manualVersion
	}

	#getVersionHash(columnIds: string[]): string {
		const version = this.#manualVersion ?? simpleHash(columnIds)
		return `${this.#storageKey}@${version}`
	}

	#validateVersionHash(columnIds: string[], version: string): boolean {
		if (!version.startsWith(`${this.#storageKey}@`)) return false

		const correctHash = simpleHash(columnIds)
		const givenHash = version.replace(`${this.#storageKey}@`, '')

		return correctHash === givenHash
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async load(
		context: StorageOperationContext,
	): Promise<SerializableState | null> {
		if (typeof window === 'undefined' || !('localStorage' in window))
			return null

		const json = window.localStorage.getItem(this.#storageKey)

		if (!json) return null

		try {
			// eslint-disable-next-line no-console
			console.debug('loading localStorage', json)

			const data = localStorageSchema.parse(JSON.parse(json))

			if (!this.#validateVersionHash(context.columnIds, data.version))
				return null

			// further validation is handled by the caller
			return data.state as SerializableState
		} catch (error) {
			// eslint-disable-next-line no-console -- this is likely something that should be visible as it is unexpected for this to fail, but not serious enough for a throw
			console.warn(
				'LocalStorageAdapter: recovered after failing to load',
				error,
			)
			return null
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async save(
		state: SerializableState,
		context: StorageOperationContext,
	): Promise<void> {
		if (typeof window === 'undefined' || !('localStorage' in window)) return

		const version = this.#getVersionHash(context.columnIds)

		const json = JSON.stringify({
			state,
			version,
		})

		// eslint-disable-next-line no-console
		console.debug('saving localStorage', json)
		window.localStorage.setItem(this.#storageKey, json)
	}
}

// class QueryParameterStorageAdapter implements KottiStandardTableStorage {
// 	// eslint-disable-next-line @typescript-eslint/require-await
// 	async load() {
// 		return {
// 			columnOrder: [],
// 			filters: [],
// 			pagination: { pageIndex: 0, pageSize: 5 },
// 			searchValue: null,
// 			sorting: [],
// 		}
// 	}

// 	// eslint-disable-next-line @typescript-eslint/require-await
// 	async save(state: SerializableState) {
// 		// qs(something)
// 		// eslint-disable-next-line no-console
// 		console.log('totally saving to query parameters', state)
// 	}
// }
