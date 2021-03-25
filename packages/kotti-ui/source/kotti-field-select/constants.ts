import { KottiField } from '../kotti-field/types'

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
					['boolean', 'undefined'].includes(typeof option.isDisabled) &&
					(option.value === null ||
						['string', 'number', 'boolean', 'symbol'].includes(
							typeof option.value,
						)),
			),
	},
	placeholder: { default: null, type: String },
	actions: {
		default: () => [],
		type: Array,
		validator: (value: unknown): value is Shared.Props['actions'] =>
			Array.isArray(value) &&
			value.every(
				// eslint-disable-next-line
				(action: any): action is Shared.Action =>
					typeof action === 'object' &&
					action !== null &&
					typeof action.label === 'string' &&
					typeof action.onClick === 'function',
			),
	},
}

export const KOTTI_FIELD_SELECT_SUPPORTS: KottiField.Supports = {
	clear: true,
	decoration: true,
	tabIndex: false,
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
