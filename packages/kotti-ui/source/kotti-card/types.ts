import { z } from 'zod'

export module KottiCard {
	export enum ImagePosition {
		BOTTOM = 'bottom',
		MIDDLE = 'middle',
		TOP = 'top',
	}

	export const propsSchema = z.object({
		imgPosition: z.nativeEnum(ImagePosition).default(ImagePosition.TOP),
		imgUrl: z.string().nullable().default(null),
		isImgLoading: z.boolean().default(false),
		isTextLoading: z.boolean().default(false),
		primaryActionLabel: z.string().nullable().default(null),
		primaryActionDataTest: z.string().optional(),
		secondaryActionLabel: z.string().nullable().default(null),
		secondaryActionDataTest: z.string().optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
