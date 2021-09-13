import { z } from 'zod'

export namespace KottiUserMenu {
	export const sectionLinkSchema = z.object({
		title: z.string(),
	})
	export type SectionLink = z.infer<typeof sectionLinkSchema>

	export const sectionSchema = z.object({
		links: z.array(sectionLinkSchema).nonempty(),
		title: z.string().nullable(),
	})

	export type Section = z.infer<typeof sectionSchema>

	export const propsSchema = z.object({
		sections: z.array(sectionSchema),
		userAvatar: z.string().nullable().default(null),
		userName: z.string().nullable().default(null),
		userStatus: z.string(),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
