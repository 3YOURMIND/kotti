import { z } from 'zod'

export namespace KottiLoading {
	const typeSchema = z.enum([
		'circle',
		'rectangle',
		'rectangle-lg',
		'rectangle-md',
		'rectangle-sm',
		'square',
	])

	export const propsSchema = z.object({
		type: typeSchema.default('rectangle'),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
