import { KtFieldSelect } from './types'

export const ktFieldSelectSharedProps = {
	options: {
		required: true,
		type: Array,
		validator: (
			value: unknown[],
		): value is KtFieldSelect.Shared.Props['options'] =>
			value.every(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(option: any): option is KtFieldSelect.Shared.Entry =>
					typeof option === 'object' &&
					option !== null &&
					typeof option.label === 'string' &&
					(option.value === null ||
						['string', 'number', 'boolean'].includes(typeof option.value)),
			),
	},
}
