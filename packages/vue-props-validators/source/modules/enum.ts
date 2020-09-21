import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase, Type } from '.'

export type TypeEnum = TypeBase<string> & {
	options: ReadonlyArray<string>
	type: Type.ENUM
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
