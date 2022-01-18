import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace Shared {
	export const valueSchema = z
		.union([z.boolean(), z.number(), z.string()])
		.nullable()
	export type Value = z.output<typeof valueSchema>

	export const entrySchema = z.object({
		dataTest: z.string().optional(),
		isDisabled: z.boolean().optional(),
		label: z.string(),
		value: valueSchema,
	})
	export type Entry = z.output<typeof entrySchema>

	const actionSchema = z.object({
		label: z.string(),
		onClick: z.function(z.tuple([]), z.void()),
	})
	export type Action = z.output<typeof actionSchema>

	export const propsSchema = z
		.object({
			actions: z.array(actionSchema).default(() => []),
			options: z.array(entrySchema),
			placeholder: z.string().nullable().default(null),
		})
		/**
		 * tabIndex is not supported due to element-ui limitation
		 * TODO: support with new select components
		 **/
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				hideClear: true,
				leftIcon: true,
				prefix: true,
				rightIcon: true,
				suffix: true,
			}),
		)

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		loadingText: string
		noDataText: string
		noMatchText: string
		placeholder: string
	}
}

export namespace KottiFieldMultiSelect {
	export const valueSchema = z.array(Shared.valueSchema)
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(Shared.propsSchema)
		.extend({
			collapseTagsAfter: z.number().default(Number.MAX_SAFE_INTEGER),
			maximumSelectable: z.number().default(Number.MAX_SAFE_INTEGER),
			value: valueSchema.default(() => []),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations
}

export namespace KottiFieldSingleSelect {
	export const valueSchema = Shared.valueSchema
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(Shared.propsSchema)
		.extend({
			value: valueSchema.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations
}

export namespace KottiFieldSingleSelectRemote {
	export const valueSchema = KottiFieldSingleSelect.valueSchema
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiFieldSingleSelect.propsSchema
		// TODO: no need for this merge when element-ui is not used under the hood anymore
		// since we rely on the KottiFieldSingleSelect merge which would include tabIndex
		.merge(KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }))
		.extend({
			isLoadingOptions: z.boolean().default(false),
			query: z.string().nullable().default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations

	export namespace Events {
		export type UpdateQuery = KottiFieldSingleSelectRemote.Props['query']
	}
}
