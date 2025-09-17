// eslint-disable-next-line @typescript-eslint/require-await
export const onPageTransitionEnd = async (): Promise<void> => {
	document.querySelector('body')?.classList.remove('page-is-transitioning')
}
