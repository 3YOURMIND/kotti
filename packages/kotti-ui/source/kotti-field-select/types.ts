import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export module Shared {
	export const valueSchema = z
		.union([z.boolean(), z.number(), z.string()])
		.nullable()
	export type Value = z.output<typeof valueSchema>

	export const optionSchema = z.object({
		dataTest: z.string().optional(),
		isDisabled: z.boolean().optional(),
		label: z.string(),
		value: valueSchema,
	})
	export type Option = z.output<typeof optionSchema>

	export const actionSchema = z.object({
		dataTest: z.string().optional(),
		label: z.string(),
		onClick: z.function(z.tuple([]), z.void()),
	})
	export type Action = z.output<typeof actionSchema>

	export const propsSchema = KottiField.propsSchema
		.merge(KottiField.potentiallySupportedPropsSchema)
		.extend({
			actions: z.array(actionSchema).default(() => []),
			isUnsorted: z.boolean().default(false),
			options: z.array(optionSchema),
			placeholder: z.string().nullable().default(null),
		})

	export const isMultipleSchema = z.object({
		clearOnSelect: z.boolean().default(false),
		collapseTagsAfter: z.number().int().min(0).default(Number.MAX_SAFE_INTEGER),
		maximumSelectable: z.number().int().min(0).default(Number.MAX_SAFE_INTEGER),
		value: z.array(Shared.valueSchema).default(() => []),
	})

	export const isRemoteSchema = z.object({
		isLoadingOptions: z.boolean().default(false),
		query: z.string().nullable().default(null),
	})

	export const isSingleSchema = z.object({
		value: Shared.valueSchema.default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		loadingText: string
		noDataText: string
		noMatchText: string
		placeholder: string
	}
}

export module KottiFieldMultiSelect {
	export const valueSchema = Shared.isMultipleSchema.shape.value._def.innerType
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = Shared.propsSchema.merge(Shared.isMultipleSchema)

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations
}

export module KottiFieldMultiSelectRemote {
	export const valueSchema = Shared.isMultipleSchema.shape.value._def.innerType
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = Shared.propsSchema
		.merge(Shared.isMultipleSchema)
		.merge(Shared.isRemoteSchema)

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations

	export module Events {
		export type UpdateQuery = KottiFieldMultiSelectRemote.Props['query']
	}
}

export module KottiFieldSingleSelect {
	export const valueSchema = Shared.valueSchema
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = Shared.propsSchema.merge(Shared.isSingleSchema)

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations
}

export module KottiFieldSingleSelectRemote {
	export const valueSchema = Shared.valueSchema
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = Shared.propsSchema
		.merge(Shared.isSingleSchema)
		.merge(Shared.isRemoteSchema)

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = Shared.Translations

	export module Events {
		export type UpdateQuery = KottiFieldSingleSelectRemote.Props['query']
	}
}
