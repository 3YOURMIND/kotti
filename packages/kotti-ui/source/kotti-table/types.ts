import { z } from 'zod'

import { KottiPopover } from '../kotti-popover/types'

export namespace KottiColumnSelector {
	const optionSchema = z.object({
		key: z.string(),
		label: z.string(),
	})

	export type Option = z.input<typeof optionSchema>

	const categorySchema = z.object({
		label: z.string().nullable().default(null),
		options: z.array(optionSchema),
	})

	export type Category = z.input<typeof categorySchema>

	export const propsSchema = z.object({
		canChangeColumnOrder: z.boolean().default(false),
		canSearchColumn: z.boolean().default(false),
		categories: z.array(categorySchema).default(() => []),
		dataTest: z.string().optional(),
		isDisabled: z.boolean().default(false),
		isLoading: z.boolean().default(false),
		label: z.string().nullable().default(null),
		selection: z.array(z.string()),
		size: KottiPopover.propsSchema.shape.size,
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		availableColumns: string
		columns: string
		searchColumn: string
		visibleColumns: string
	}
}
