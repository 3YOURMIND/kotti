import { z } from 'zod'

export const validateTotalIsNumber = (value: unknown): value is number => {
	const isNumber = z.number().safeParse(value).success
	if (!isNumber) {
		// eslint-disable-next-line no-console
		console.error(
			`Invalid combination of props for KtPagination:
			The prop "total" may only be null or not provided if the "flex" paging style is used`,
		)
	}

	return isNumber
}
