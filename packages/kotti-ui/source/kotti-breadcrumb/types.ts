import { Yoco, yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiBreadcrumb {
	export enum SeparatorType {
		ICON = 'icon',
		TEXT = 'text',
	}
	export const separatorTypeSchema = z.nativeEnum(SeparatorType)

	export const breadcrumbSchema = z.object({
		isCompleted: z.boolean(),
		onClick: z.function(z.tuple([]), z.void()),
		title: z.string(),
	})
	export type Breadcrumb = z.infer<typeof breadcrumbSchema>

	export const separatorSchema = z.union([
		z.object({
			style: z.literal(SeparatorType.ICON),
			value: yocoIconSchema,
		}),
		z.object({
			style: z.literal(SeparatorType.TEXT),
			value: z.string(),
		}),
	])
	export type Separator = z.infer<typeof separatorSchema>

	export const propsSchema = z.object({
		breadcrumbs: z.array(breadcrumbSchema),
		separator: separatorSchema.default(() => ({
			style: SeparatorType.ICON as const,
			value: Yoco.Icon.CHEVRON_RIGHT,
		})),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
