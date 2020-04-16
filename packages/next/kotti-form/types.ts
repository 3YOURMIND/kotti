// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace KottiForm {
	// export interface Props {}

	export interface Context<
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		CONTEXT_TYPE extends Record<string, any> = Record<string, any>
	> {
		setValue: <T extends keyof CONTEXT_TYPE>(
			formKey: T,
			newValue: CONTEXT_TYPE[T],
		) => void
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		validators: Record<string, (value: any) => string | true>
		values: CONTEXT_TYPE
	}
}
