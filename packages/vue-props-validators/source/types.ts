import { REQUIRED } from './constants'
import { Option, Type } from './modules'

type Id<T extends object> = { [KEY in keyof T]: T[KEY] }

export type Options = Record<string, Option>

export type ExtendsOne<
	INPUT extends Option,
	IF extends Type,
	THEN,
	ELSE
> = INPUT['type'] extends IF ? THEN : ELSE

export type Result<
	INPUT extends Option,
	TYPE extends
		| ArrayConstructor
		| BooleanConstructor
		| DateConstructor
		| FunctionConstructor
		| NumberConstructor
		| ObjectConstructor
		| StringConstructor
		| SymbolConstructor
> = Id<
	{
		type: TYPE
		validator: (value: unknown) => boolean
	} & (INPUT['default'] extends typeof REQUIRED
		? { required: true }
		: { default: INPUT['default'] })
>
