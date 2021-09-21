import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiNavbar {
	export const notificationSchema = z.object({
		count: z.number(),
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
		icon: yocoIconSchema,
		isActive: z.boolean(),
		title: z.string(),
		to: z.unknown().optional(),
	})
	export type SectionLink = z.infer<typeof sectionLinkSchema>

	export const sectionSchema = z.object({
		title: z.string().nullable(),
		links: z.array(sectionLinkSchema),
	})
	export type Section = z.infer<typeof sectionSchema>

	export enum Theme {
		DARK = 'dark',
		LIGHT = 'light',
		REVERSE = 'reverse',
	}
	export const themeSchema = z.nativeEnum(Theme)

	export const propsInternalSchema = z.object({
		isNarrow: z.boolean(),
		logoUrl: z.string(),
		notification: notificationSchema.nullable(),
		quickLinks: z.array(quickLinkSchema),
		sections: z.array(sectionSchema),
		theme: themeSchema.nullable(),
	})
	export type PropsInternal = z.infer<typeof propsInternalSchema>

	export type Props = SpecifyRequiredProps<
		PropsInternal,
		'logoUrl' | 'sections'
	>

	export type Translations = {
		menuCollapse: string
		menuExpand: string
		quickLinksTitle: string
	}
}
