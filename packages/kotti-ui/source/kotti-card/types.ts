import { z } from 'zod'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export module KottiCard {
	export enum ImagePosition {
		BOTTOM = 'bottom',
		MIDDLE = 'middle',
		TOP = 'top',
	}

	export const propsSchema = z.object({
		imgPosition: createLooseZodEnumSchema(ImagePosition).default(
			ImagePosition.TOP,
		),
		imgUrl: z.string().nullable().default(null),
		isImgLoading: z.boolean().default(false),
		isTextLoading: z.boolean().default(false),
		primaryActionDataTest: z.string().optional(),
		primaryActionLabel: z.string().nullable().default(null),
		secondaryActionDataTest: z.string().optional(),
		secondaryActionLabel: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
