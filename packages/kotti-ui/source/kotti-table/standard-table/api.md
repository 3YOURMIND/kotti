# API

## Review Comments

- [ ] make sure it wraps properly
- [ ] consider display-noning sorting indicator when inactive and showing animation when toggling making it appear
- [ ] table looses scroll position when loading
- [ ] should have a simpler loading state if datat is already present
- [ ] check search placeholder and popover sizes in documentation
- [ ] use api/internal pattern for return
- [ ] sync pagination schema
- [ ] simplify forwarding properties from standard table to table, some properties are not forwarded yet
- [ ] remove local pagination
- [ ] check useComputedRef for reactivity bugs
- [ ] FIXMEs/TODOs
- [ ] double-check all calls to table.getState() and other direct calls to tanstack api
- [ ] prune out schemas from types.ts that don't need

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
