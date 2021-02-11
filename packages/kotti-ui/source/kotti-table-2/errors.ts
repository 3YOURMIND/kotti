import { CustomError } from 'ts-custom-error'

class UnexpectedDragSourceType extends CustomError {
	public constructor() {
		super('KtTable2: Missing DragSource')
	}
}

export const KtTable2Errors = {
	UnexpectedDragSourceType,
}
