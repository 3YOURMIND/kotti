import { z } from 'zod'

const themeSchema = z.enum(['dark', 'light'])

export const getColorScheme = (): 'dark' | 'light' => {
	const dataTheme = document.documentElement.getAttribute('data-theme')
	const res = themeSchema.safeParse(dataTheme)
	if (res.success) {
		return res.data
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}
