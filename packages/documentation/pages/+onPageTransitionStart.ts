import type { OnPageTransitionStartAsync } from 'vike/types'

// eslint-disable-next-line @typescript-eslint/require-await
export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
	// eslint-disable-next-line no-console
	console.log('Page transition start')
	document.querySelector('body')?.classList.add('page-is-transitioning')
}
