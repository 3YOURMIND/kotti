import { Route } from 'vue-router'
import { computed, getCurrentInstance } from '@vue/composition-api'

/**
 * @see {@link https://github.com/nuxt-community/composition-api/blob/9df413e403e77043dc471826a3de10a528efdb83/src/context.ts#L46}
 */
export const useRoute = () => {
	const vm = getCurrentInstance()

	if (!vm) throw new Error('This must be called within a setup function.')

	return computed((): Route => vm.$route)
}
