// eslint-disable-next-line @typescript-eslint/require-await
export const onPageTransitionStart = async (): Promise<void> => {
	document.querySelector('body')?.classList.add('page-is-transitioning')
}
