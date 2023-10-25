import { Kotti } from '@3yourmind/kotti-ui'

export type ComponentNames =
	| 'KtFieldDate'
	| 'KtFieldDateRange'
	| 'KtFieldDateTime'
	| 'KtFieldDateTimeRange'
	| 'KtFieldFileUpload'
	| 'KtFieldFileUploadRemote'
	| 'KtFieldMultiSelect'
	| 'KtFieldMultiSelectRemote'
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
	| 'KtValueLabel'

const COMPONENT_NAMES: ComponentNames[] = [
	'KtFieldDate',
	'KtFieldDateRange',
	'KtFieldDateTime',
	'KtFieldDateTimeRange',
	'KtFieldFileUpload',
	'KtFieldFileUploadRemote',
	'KtFieldMultiSelect',
	'KtFieldMultiSelectRemote',
	'KtFieldNumber',
	'KtFieldPassword',
	'KtFieldRadioGroup',
	'KtFieldSingleSelect',
	'KtFieldSingleSelectRemote',
	'KtFieldText',
	'KtFieldTextArea',
	'KtFieldToggle',
	'KtFieldToggleGroup',
	'KtFilters',
	'KtValueLabel',
]

export type ComponentValue = {
	contentSlot: string | null
	defaultSlot: string | null
	hasActions: boolean
	hasHelpTextSlot: boolean
	hasRemoteUpload: boolean
	hasOptionSlot: boolean
	headerSlot: string | null
	showHeaderSideSlot: boolean
	name: ComponentNames
	props: Record<string, unknown>
	validation: Kotti.Field.Validation.Result['type']
}

export const isComponentName = (name: unknown): name is ComponentNames =>
	COMPONENT_NAMES.includes(name as ComponentNames)

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

export const createRemoteUpload = (
	hasRemoteUpload: boolean,
): Record<string, unknown> | undefined =>
	hasRemoteUpload
		? {
				actions: {
					/* eslint-disable no-console */
					onCancel: (id: number | string) => console.log(`onCancel: ${id}`),
					onDelete: (id: number | string) => console.log(`onDelete: ${id}`),
					onRetry: (id: number | string) => console.log(`onRetry: ${id}`),
					onUpload: (id: number | string) => console.log(`onUpload: ${id}`),
					/* eslint-enable no-console */
				},
				payload: {},
		  }
		: undefined

const createRemoteUploadCode = (component: ComponentValue): string | null => {
	const remoteUpload = createRemoteUpload(component.hasRemoteUpload)

	return remoteUpload
		? `${[
				...Object.entries(remoteUpload)
					.map(([key, value]) => {
						if (key === 'actions')
							return [
								`\t:${key}: {`,
								...Object.keys(value as Record<string, unknown>).map(
									(k) => `\t\t${k}: (id: number | string) => {},`,
								),
								'\t},',
							].join('\n')

						if (key === 'payload')
							return `\t:${key}: ${JSON.stringify(value).replace(/"/g, "'")},`
					})
					.filter((value) => value),
		  ].join('\n')}`
		: null
}

const appendAdditionalSlots = (component: ComponentValue) => {
	return component.contentSlot !== null ||
		component.defaultSlot !== null ||
		component.hasHelpTextSlot ||
		component.headerSlot !== null
		? [
				'>',
				...(component.contentSlot !== null
					? [
							'\t<template #content :option="option">',
							`\t\t${component.contentSlot}`,
							// eslint-disable-next-line sonarjs/no-duplicate-string
							'\t</template>',
					  ]
					: []),
				...(component.defaultSlot !== null
					? [`\t${component.defaultSlot}`]
					: []),
				...(component.hasHelpTextSlot
					? [
							'\t<template #helpText>',
							'\t\t<div>',
							'\t\t\tSlot Content',
							'\t\t</div>',
							'\t</template>',
					  ]
					: []),
				...(component.headerSlot !== null
					? [
							'\t<template #header :option="option">',
							`\t\t${component.headerSlot}`,
							'\t</template>',
					  ]
					: []),
				`</${component.name}>`,
		  ].join('\n')
		: '/>'
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
					!(key === 'size' && value === Kotti.Field.Size.MEDIUM) &&
					!(key === 'helpText' && component.hasHelpTextSlot) &&
					!(
						key === 'extensions' &&
						Array.isArray(value) &&
						value.length === 0
					) &&
					key !== 'actions' &&
					key !== 'payload',
			)
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
		createRemoteUploadCode(component),
		appendAdditionalSlots(component),
	]
		.filter((value) => value)
		.join('\n')
