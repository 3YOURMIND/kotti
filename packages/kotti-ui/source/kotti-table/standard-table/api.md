# API

## Kinds

- LocalStorage
- QueryParameters
- Backend

## TODO:

- consider moving storage outside of standard-table and making it generic instead of specific to one single schema

## What does it do?

- support async (?)
- should support multiple adapters
- should save the table's state to the provided storage(s)
- validate loaded data
- **FIXME: what does it do**

## Data

```ts
import { z } from 'zod'

const schema = z
	.object({
		searchValue: z.string().nullable(),
		columnOrder: z.array(z.string()),
		sorting: z.array(
			z
				.object({
					id: z.string(),
					value: z.enum(['ascending', 'descending']),
				})
				.strict(),
		),
		filters: filtersSchema,
		pagination: z
			.object({
				pageIndex: z.number(),
				pageSize: z.number(),
			})
			.strict(),
	})
	.strict()

type SerializableState = {
	searchValue: string | null
	columnOrder: string[]
	sorting: {
		id: string
		value: 'ascending' | 'descending'
	}[]
	filters: { id: string; value: any }[]
	pagination: {
		pageIndex: number
		pageSize: number
	}
}
```

Store this somewhere and restore from it

## Propositions

```ts
type Adapter = {
	save: (state: SerializableState) => Promise<void>
	load: () => Promise<SerializableState>
}

const adapter: Adapter

const tableHook = useKottiStandardTable({
	//...,
	storageAdapter: adapter,
})
```
