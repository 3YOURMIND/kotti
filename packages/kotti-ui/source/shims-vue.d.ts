import type { HTMLAttributes } from 'vue'

declare module '@vue/runtime-core' {
	interface AllowedComponentProps extends HTMLAttributes {
		dataTest?: string | null
		ref?: string
		// // This allows any data- attribute to be passed to any component
		// [key: `data-${string}`]: unknown
	}
}

export {}
