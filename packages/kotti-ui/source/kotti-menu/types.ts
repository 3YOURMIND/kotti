import { z } from 'zod'

export namespace KottiMenu {
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

	export const selectableOptionSchema = optionSchema.extend({
		isSelectable: z.boolean().default(false),
		isSelected: z.boolean().default(false),
	})

	export type Option = z.output<typeof optionSchema>
	export type SelectableOptionSchema = z.output<typeof selectableOptionSchema>

	export const actionSchema = z.object({
		label: z.string(),
		onClick: z.function(z.tuple([]), z.void()),
	})
	export type Action = z.output<typeof actionSchema>

	export const propsSchema = z.object({
		options: z.array(optionSchema).or(z.array(selectableOptionSchema)),
		actions: z.array(actionSchema).default([]),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
