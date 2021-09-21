import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'

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

	export const propsInternalSchema = z.object({
		sections: z.array(sectionSchema),
		userAvatar: z.string().nullable(),
		userName: z.string().nullable(),
		userStatus: z.string(),
	})
	export type PropsInternal = z.infer<typeof propsInternalSchema>

	export type Props = SpecifyRequiredProps<
		KottiUserMenu.PropsInternal,
		'sections' | 'userStatus'
	>
}
