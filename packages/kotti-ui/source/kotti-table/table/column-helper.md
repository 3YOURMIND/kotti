```ts
const display = getDisplay({
	type: 'text',
})

const columns = [createColumn({ display, getData: () => {}, id: 'some-id' })]
```

---

```ts
const row = { a: 'foo', b: 'bar' }

const columnHelper = getColumnHelper({ type: 'text' })

const mapper = (someRow) => someRow.a
const passMeIntoUseKottiTableColumns = columnHelper(mapper, {
	id: 'some_id',
	isSortable: true,
	label: 'label',
})
```

```ts
const columnHelper = getColumnHelper()

const passMeIntoUseKottiTableColumns = columHelper.type({})
```
