import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'
import type Router from 'vue-router'

export const useRouter = (): ComputedRef<Router> => {
	const vm = getCurrentInstance()

	if (!vm) throw new Error('This must be called within a setup function.')

	return computed((): Router => vm.proxy.$root.$router)
}
