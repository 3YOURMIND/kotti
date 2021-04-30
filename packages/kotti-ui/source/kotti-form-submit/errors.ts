import { CustomError } from 'ts-custom-error'

class InvalidSubmitOutsideContext extends CustomError {
	public constructor() {
		const messages = [
			'Encountered a “<KtFormSubmit />” outside of a “<KtForm/>”',
		]
		super(`KtFormSubmit: ${messages.join('\n')}`)
	}
}

export const KtFormSubmitErrors = {
	InvalidSubmitOutsideContext,
}
