class InvalidSubmitOutsideContextError extends Error {
	public constructor() {
		const messages = [
			'Encountered a “<KtFormSubmit />” outside of a “<KtForm/>”',
		]
		super(`KtFormSubmit: ${messages.join('\n')}`)
		this.name = 'InvalidSubmitOutsideContextError'
	}
}

export const ktFormSubmitErrors = {
	InvalidSubmitOutsideContextError,
}
