import { KottiFieldToggleGroup } from './types'

export const KOTTI_FIELD_TOGGLE_GROUP_PROPS = {
	options: {
		required: true,
		type: Array,
		validator: (
			options: unknown,
		): options is KottiFieldToggleGroup.Props['options'] =>
			Array.isArray(options) &&
			options.every(
				(option) =>
					option !== null &&
					typeof option === 'object' &&
					typeof option.label === 'string' &&
					typeof option.key === 'string',
			),
	},
}
