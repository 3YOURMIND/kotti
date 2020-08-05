import { computed, getCurrentInstance } from '@vue/composition-api'
import Router from 'vue-router'

export const useRouter = () => {
	const vm = getCurrentInstance()

	if (!vm) throw new Error('This must be called within a setup function.')

	return computed((): Router => vm.$router)
}
