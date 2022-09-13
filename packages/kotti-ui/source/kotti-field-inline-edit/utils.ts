import { Kotti } from '../types'

import { KottiFieldInlineEdit } from './types'

export const useSize = (
	mode: KottiFieldInlineEdit.Shared.Mode,
): Kotti.Field.Size => {
	switch (mode) {
		case KottiFieldInlineEdit.Shared.Mode.HEADER:
			return Kotti.Field.Size.LARGE
		case KottiFieldInlineEdit.Shared.Mode.TEXT_LINE:
			return Kotti.Field.Size.SMALL
		default:
			return Kotti.Field.Size.MEDIUM
	}
}
