import { z } from 'zod'

import { refinementNonEmpty } from '../zod-refinements'

export namespace KottiUserMenu {
	export const sectionLinkSchema = z
		.object({
			link: z.string().optional(),
			title: z.string(),
		})
		.passthrough()
	export type SectionLink = z.infer<typeof sectionLinkSchema>

	export const sectionSchema = z.object({
		links: z.array(sectionLinkSchema).refine(...refinementNonEmpty),
		title: z.string().nullable(),
	})

	export type Section = z.infer<typeof sectionSchema>

	export const propsSchema = z.object({
		sections: z.array(sectionSchema).refine(...refinementNonEmpty),
		userAvatar: z.string().nullable().default(null),
		userName: z.string().nullable().default(null),
		userStatus: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
