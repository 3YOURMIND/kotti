export const silenceConsole = (): void => {
	console.debug = () => undefined
	console.error = () => undefined
	console.group = () => undefined
	console.groupEnd = () => undefined
	console.info = () => undefined
	console.log = () => undefined
	console.warn = () => undefined
}
