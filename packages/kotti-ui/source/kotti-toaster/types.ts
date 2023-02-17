import { TimeConversion } from '@metatypes/units'
import { z } from 'zod'

import { DEFAULT_YODIFY_NOTIFICATION_DURATION_IN_SECONDS } from './constants'

export namespace KottiToaster {
	export enum Type {
		ERROR = 'error',
		INFO = 'info',
		SUCCESS = 'success',
		WARNING = 'warning',
	}
	const types = [Type.ERROR, Type.INFO, Type.SUCCESS, Type.WARNING] as const

	export const notificationSchema = z.object({
		duration: z
			.number()
			.optional()
			.default(
				DEFAULT_YODIFY_NOTIFICATION_DURATION_IN_SECONDS *
					TimeConversion.MILLISECONDS_PER_SECOND,
			),
		text: z.string(),
		type: z.enum(types),
	})
	export type Notification = z.input<typeof notificationSchema>

	export const notificationInternalSchema =
		KottiToaster.notificationSchema.extend({
			// internally generated
			id: z.string().optional(),
		})
	export type NotificationInternal = z.input<typeof notificationInternalSchema>
}
