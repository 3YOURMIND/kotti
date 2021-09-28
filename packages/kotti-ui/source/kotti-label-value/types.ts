import { z } from 'zod'

export namespace KottiLabelValue {
	export enum EmphasisSize {
		NONE = 'none',
		MEDIUM = 'md',
		LARGE = 'lg',
	}
	export enum EmphasisStyle {
		FULL = 'full',
		VALUE = 'value',
	}

	export const propsSchema = z.object({
		emphasisSize: z.nativeEnum(EmphasisSize).default(EmphasisSize.NONE),
		emphasisStyle: z.nativeEnum(EmphasisStyle).default(EmphasisStyle.VALUE),
		isHorizontal: z.boolean().default(false),
		label: z.string(),
		value: z.union([z.string(), z.number(), z.null()]).default(null),
	})

	export type PropsInternal = z.input<typeof propsSchema>
	export type Props = z.output<typeof propsSchema>
}
