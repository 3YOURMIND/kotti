import { z } from 'zod'

export namespace KottiColumnSelector {
	export enum Size {
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	const optionSchema = z.object({
		key: z.string(),
		label: z.string(),
	})

	export type Option = z.input<typeof optionSchema>

	const categorySchema = z.object({
		label: z.string(),
		options: z.array(optionSchema),
	})

	export type Category = z.input<typeof categorySchema>

	export const propsSchema = z.object({
		canChangeColumnOrder: z.boolean().default(false),
		categories: z.array(categorySchema).default(() => []),
		defaultSelection: z.array(z.string()).nullable().default(null),
		isLoading: z.boolean().default(false),
		selection: z.array(z.string()),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
