import { REQUIRED } from './constants'
import { Option } from './modules'

type Id<T extends object> = { [KEY in keyof T]: T[KEY] }

export type Options = Record<string, Option>

export type ExtendsOne<
	INPUT extends Option,
	IF extends Option['type'],
	RESULT,
	ELSE
> = INPUT['type'] extends IF ? RESULT : ELSE

export type Result<
	INPUT extends Option,
	TYPE extends typeof String | typeof Number
> = Id<
	{
		type: TYPE
		validator: (value: unknown) => boolean
	} & (INPUT['default'] extends typeof REQUIRED
		? { required: true }
		: { default: INPUT['default'] })
>
