import { Shared } from './types'

const KOTTI_FIELD_SELECT_PROPS = {
	options: {
		required: true,
		type: Array,
		validator: (value: unknown[]): value is Shared.Props['options'] =>
			value.every(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(option: any): option is Shared.Entry =>
					typeof option === 'object' &&
					option !== null &&
					typeof option.label === 'string' &&
					['boolean', 'undefined'].includes(typeof option.disabled) &&
					(option.value === null ||
						['string', 'number', 'boolean', 'symbol'].includes(
							typeof option.value,
						)),
			),
	},
}

export const KOTTI_FIELD_SINGLE_SELECT_PROPS = {
	...KOTTI_FIELD_SELECT_PROPS,
}

export const KOTTI_FIELD_MULTI_SELECT_PROPS = {
	...KOTTI_FIELD_SELECT_PROPS,
	collapseTagsAfter: {
		default: Number.MAX_SAFE_INTEGER,
		type: Number,
	},
}
