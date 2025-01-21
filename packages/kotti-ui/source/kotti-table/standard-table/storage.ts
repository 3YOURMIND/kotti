import { z } from 'zod'

import { simpleHash } from './simple-hash'
import type { FilterInfo } from './types'
import { KottiStandardTable } from './types'

export const serializableStateSchema = z
	.object({
		appliedFilters: z.array(KottiStandardTable.appliedFilterSchema),
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
	/**
	 * Used to get qualifying information about filters for parsing and validating them
	 */
	filterInfo: Map<string, FilterInfo>
}

export class LocalStorageAdapter implements KottiStandardTableStorage {
	#manualVersion: string | null
	#storageKey: string

	constructor(key: string, manualVersion: string | null = null) {
		this.#storageKey = key
		this.#manualVersion = manualVersion
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

		window.localStorage.setItem(this.#storageKey, json)
	}

	#getVersionHash(columnIds: string[]): string {
		const version = this.#manualVersion ?? simpleHash(columnIds)
		return `${this.#storageKey}@${version}`
	}

	#validateVersionHash(columnIds: string[], version: string): boolean {
		if (!version.startsWith(`${this.#storageKey}@`)) return false

		const correctHash = this.#manualVersion ?? simpleHash(columnIds)
		const givenHash = version.replace(`${this.#storageKey}@`, '')

		return correctHash === givenHash
	}
}
