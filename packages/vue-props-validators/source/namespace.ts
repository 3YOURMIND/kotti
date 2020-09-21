import { Type, Option } from './modules'
import { createBoolean } from './modules/boolean'
import { createEnum } from './modules/enum'
import { createFloat } from './modules/float'
import { createInteger } from './modules/integer'
import { createString } from './modules/string'
import { Options, Result } from './types'

type ResultMap<OPTION extends Option> = {
	[Type.BOOLEAN]: Result<OPTION, BooleanConstructor>
	[Type.ENUM]: Result<OPTION, StringConstructor>
	[Type.FLOAT]: Result<OPTION, NumberConstructor>
	[Type.INTEGER]: Result<OPTION, NumberConstructor>
	[Type.STRING]: Result<OPTION, StringConstructor>
}

export const create = <PROPS extends Options>(
	props: PROPS,
): {
	[KEY in keyof PROPS]: ResultMap<PROPS[KEY]>[PROPS[KEY]['type']]
} =>
	Object.fromEntries(
		Object.entries(props).map(([prop, option]) => {
			switch (option.type) {
				case Type.BOOLEAN:
					return [prop, createBoolean(option)]

				case Type.ENUM:
					return [prop, createEnum(option)]

				case Type.FLOAT:
					return [prop, createFloat(option)]

				case Type.INTEGER:
					return [prop, createInteger(option)]

				case Type.STRING:
					return [prop, createString(option)]
			}

			throw new Error('invalid')
		}),
	)

export { REQUIRED } from './constants'
export { Type } from './modules'
