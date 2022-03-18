import { Kotti } from '@3yourmind/kotti-ui'

export type ComponentNames =
	| 'KtFieldDate'
	| 'KtFieldDateRange'
	| 'KtFieldDateTime'
	| 'KtFieldDateTimeRange'
	| 'KtFieldMultiSelect'
	| 'KtFieldNumber'
	| 'KtFieldPassword'
	| 'KtFieldRadioGroup'
	| 'KtFieldSingleSelect'
	| 'KtFieldSingleSelectRemote'
	| 'KtFieldText'
	| 'KtFieldTextArea'
	| 'KtFieldToggle'
	| 'KtFieldToggleGroup'
	| 'KtFilters'

export type ComponentValue = {
	hasActions: boolean
	hasHelpTextSlot: boolean
	name: ComponentNames
	props: Record<string, unknown>
	validation: Kotti.Field.Validation.Result['type']
}

export const createActions = (
	hasActions: boolean,
): Array<Record<string, unknown>> | undefined =>
	hasActions
		? [
				{
					label: 'Create Item',
					onClick: () => alert('actions[0].onClick called'),
				},
				{
					label: 'Edit Item',
					onClick: () => alert('actions[1].onClick called'),
				},
		  ]
		: undefined

export const generateComponentCode = (component: ComponentValue) =>
	[
		`<${component.name}`,
		...Object.entries(component.props)
			.sort(([a], [b]) => a.localeCompare(b))
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([key, value]) => {
				if (['query'].includes(key)) {
					// display `query` prop to show even if the value is `null`
					return true
				}
				return value !== null && value !== false
			})
			.filter(
				([key, value]) =>
					!(key === 'size' && value === Kotti.Field.Size.MEDIUM),
			)
			.filter(([key]) => !(key === 'helpText' && component.hasHelpTextSlot))
			.map(([key, value]) => {
				switch (typeof value) {
					case 'boolean':
						return key
					case 'string':
						return `${key}="${value}"`
					default:
						return `:${key}="${JSON.stringify(value).replace(/"/g, "'")}"`
				}
			})
			.map((prop) => `\t${prop}`),
		...(component.hasActions
			? [
					`\t:actions="${JSON.stringify(
						createActions(true)?.map(
							(a) => `{ label: '${a.label}', onClick: () => {} }`,
						) ?? [],
					).replaceAll('"', '')}"`,
			  ]
			: []),
		...(component.validation === 'empty'
			? []
			: [
					`\t:validator="(value) => ({ text: 'Some Validation Text', type: "${component.validation}" })"`,
			  ]),
		component.hasHelpTextSlot
			? `>\n\t<template #helpText>\n\t\t<div>\n\t\t\tSlot Content\n\t\t</div>\n\t</template>\n</${component.name}>`
			: '/>',
	].join('\n')
