declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<
		Record<string, never>,
		Rcord<string, never>,
		// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		any
	>
	export default component
}
