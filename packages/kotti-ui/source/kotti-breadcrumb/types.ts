import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'
import { yocoIconSchema } from '../validators'

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

	export const propsInternalSchema = z.object({
		breadcrumbs: z.array(breadcrumbSchema),
		separator: separatorSchema,
	})
	export type PropsInternal = {
		breadcrumbs: Array<Breadcrumb>
		separator: Separator
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'breadcrumbs'>
}
