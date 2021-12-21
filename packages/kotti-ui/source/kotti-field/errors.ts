import { CustomError } from 'ts-custom-error'

import { KottiField } from './types'

const createErrorMessage = (props: KottiField.Props, messages: string[]) =>
	`useField(${props.formKey ?? props.label}): ${messages.join('\n')}`

class ImplicitFormKeyNone extends CustomError {
	public constructor(props: KottiField.Props) {
		super(
			createErrorMessage(props, [
				'Encountered a KtField without a “formKey” inside a KtForm.',
				'This means that the field will not connect itself to the KtForm’s Context Values',
				'If this is not a mistake, please add formKey="NONE" to your field and bind v-model explicitly.',
			]),
		)
	}
}

class InvalidPropOutsideOfContext extends CustomError {
	public constructor(
		props: KottiField.Props,
		propName: keyof KottiField.Props,
	) {
		super(
			createErrorMessage(props, [
				`Encountered a KtField with a “${propName}” outside a KtForm.`,
				'This is most likely a mistake and should be removed.',
			]),
		)
	}
}

class DisabledSetValueCalled extends CustomError {
	public constructor(props: KottiField.Props) {
		super(
			createErrorMessage(props, [
				'Attempted to setValue on a disabled field.',
				'Diasbled fields should never call setValue as it causes unexpected behavior.',
			]),
		)
	}
}

class InvalidDataType extends CustomError {
	public constructor(props: KottiField.Props, newValue: unknown) {
		super(
			createErrorMessage(props, [
				`Encountered invalid data type, “${typeof newValue}” with value “${JSON.stringify(
					newValue,
				)}”.`,
			]),
		)
	}
}

class UnsupportedProp extends CustomError {
	public constructor(
		props: KottiField.Props,
		{
			supportsKey,
			propKey,
			value,
		}: {
			supportsKey: string
			propKey: string
			value: unknown
		},
	) {
		super(
			createErrorMessage(props, [
				`Encountered Unsupported Prop “${propKey}” with value “${value}”.`,
				`“${supportsKey}” is not supported in this field.`,
			]),
		)
	}
}

export const KtFieldErrors = {
	DisabledSetValueCalled,
	ImplicitFormKeyNone,
	InvalidDataType,
	InvalidPropOutsideOfContext,
	UnsupportedProp,
}
