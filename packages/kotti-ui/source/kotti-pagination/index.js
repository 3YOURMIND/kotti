import KtPagination from './src/Pagination.vue'

KtPagination.install = function (Vue) {
	Vue.component(KtPagination.name, KtPagination)
}

export { KtPagination }
