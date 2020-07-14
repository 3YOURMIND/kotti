// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { VNode } from 'vue'

declare global {
	namespace JSX {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Element extends VNode {}
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ElementClass extends Vue {}
		interface IntrinsicElements {
			// eslint-disable-next-line
			[elem: string]: any
		}
	}
}
