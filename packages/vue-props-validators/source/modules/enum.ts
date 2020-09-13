import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase } from '.'

export type TypeEnum = TypeBase & {
	options: string[]
	type: 'enum'
}

export const createEnum = <OPTION extends TypeEnum>(
	option: OPTION,
): Result<OPTION, StringConstructor> => ({
	...resolveDefault(option),
	type: String,
	validator: baseValidator(
		option,
		(value: unknown) =>
			typeof value === 'string' && option.options.includes(value),
	),
})
