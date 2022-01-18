import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

import { refinementNonEmpty } from '../zod-refinements'

export namespace KottiNavbar {
	export const notificationSchema = z.object({
		count: z.number().int(),
		link: z.string(),
		title: z.string(),
	})
	export type Notification = z.infer<typeof notificationSchema>

	export const quickLinkSchema = z.object({
		link: z.string(),
		title: z.string(),
	})
	export type QuickLink = z.infer<typeof quickLinkSchema>

	export const sectionLinkSchema = z.object({
		component: z.string().default('a'),
		icon: yocoIconSchema,
		isActive: z.boolean(),
		props: z.record(z.unknown()).optional(),
		title: z.string(),
	})
	export type SectionLink = z.infer<typeof sectionLinkSchema>

	export const sectionSchema = z.object({
		links: z.array(sectionLinkSchema).refine(...refinementNonEmpty),
		title: z.string().nullable(),
	})
	export type Section = z.infer<typeof sectionSchema>

	export enum Theme {
		DARK = 'dark',
		LIGHT = 'light',
		REVERSE = 'reverse',
	}
	export const themeSchema = z.nativeEnum(Theme)

	export const propsSchema = z.object({
		isNarrow: z.boolean().default(false),
		logoUrl: z.string(),
		notification: notificationSchema.nullable().default(null),
		quickLinks: z.array(quickLinkSchema).default(() => []),
		sections: z.array(sectionSchema).refine(...refinementNonEmpty),
		theme: themeSchema.nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		menuCollapse: string
		menuExpand: string
		quickLinksTitle: string
	}
}
