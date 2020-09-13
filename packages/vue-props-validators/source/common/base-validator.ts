import { Option } from '../modules'

export const baseValidator = (
	option: Option,
	validator: (value: unknown) => boolean,
) => (value: unknown) =>
	option.nullable && value === null ? true : validator(value)
