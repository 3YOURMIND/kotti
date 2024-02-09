import { z } from 'zod'

import { KottiAvatar } from '../kotti-avatar/types'
import { refinementNonEmpty } from '../zod-utilities/refinements'

export module KottiAvatarGroup {
	/**
	 * same type of name and src but they are required keys on the item object schema;
	 * removeDefault: removes the default value &
	 * unwrap: removes the Nullable wrapper.
	 */
	const itemSchema = z.object({
		name: KottiAvatar.propsSchema.shape.name.removeDefault().unwrap(),
		src: KottiAvatar.propsSchema.shape.src.removeDefault().unwrap(),
	})

	export const propsSchema = KottiAvatar.propsSchema
		.pick({
			isHoverable: true,
			size: true,
		})
		.extend({
			count: z.number().default(2),
			isStack: z.boolean().default(false),
			items: z.array(itemSchema).refine(...refinementNonEmpty),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
