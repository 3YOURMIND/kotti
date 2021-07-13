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
	hasHelpTextSlot: boolean
	name: ComponentNames
	props: object
	slots?: Array<{ name: string; content: string | null }>
	validation: Kotti.Field.Validation.Result['type']
}

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
		...(component.validation === 'empty'
			? []
			: [
					`\t:validator="(value) => ({ text: 'Some Validation Text', type: "${component.validation}" })"`,
			  ]),
		component.hasHelpTextSlot || (component.slots?.length ?? 0) > 0
			? [
					'>',
					...(component.hasHelpTextSlot
						? [
								'\t<template #helpText>',
								'\t\t<div>',
								'\t\t\tSlot Content',
								'\t\t</div>',
								'\t</template>',
						  ]
						: []),
					...(component.slots?.map(
						({ name, content }) =>
							`\t<template #${name} v-text="${content}" />`,
					) ?? []),
					`</${component.name}>`,
			  ].join('\n')
			: '/>',
	].join('\n')
