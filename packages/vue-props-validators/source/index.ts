import { resolveDefault } from './common/resolve-default'
import { REQUIRED } from './constants'
import { createEnum } from './modules/enum'
import { Options, ExtendsOne, Result } from './types'
import { isNumber } from './utilities'

export const vuePropsValidators = <PROPS extends Options>(
	props: PROPS,
): {
	[KEY in keyof PROPS]: ExtendsOne<
		PROPS[KEY],
		'enum',
		Result<PROPS[KEY], StringConstructor>,
		ExtendsOne<
			PROPS[KEY],
			'float',
			Result<PROPS[KEY], NumberConstructor>,
			ExtendsOne<
				PROPS[KEY],
				'integer',
				Result<PROPS[KEY], NumberConstructor>,
				never
			>
		>
	>
} =>
	Object.fromEntries(
		Object.entries(props).map(([prop, option]) => {
			switch (option.type) {
				case 'enum':
					return [prop, createEnum(option)]

				case 'float':
					return [
						prop,
						{
							...resolveDefault(option),
							type: Number,
							validator: (value: unknown) => isNumber(value),
						},
					]

				case 'integer':
					return [
						prop,
						{
							...resolveDefault(option),
							type: Number,
							validator: (value: unknown) => Number.isSafeInteger(value),
						},
					]
			}

			throw new Error('invalid')
		}),
	)

const X = vuePropsValidators({
	example: {
		default: REQUIRED,
		nullable: true,
		type: 'enum',
	},
	example2: {
		default: REQUIRED,
		nullable: true,
		type: 'integer',
	},
	example3: {
		// eslint-disable-next-line no-magic-numbers
		default: () => 123,
		nullable: true,
		type: 'integer',
	},
})
