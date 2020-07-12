import KtDateInput from './src/DateInput.vue'
import KtDatePicker from './src/DatePicker.vue'

KtDatePicker.install = function (Vue) {
	Vue.component(KtDateInput.name, KtDateInput)
	Vue.component(KtDatePicker.name, KtDatePicker)
}

export { KtDateInput, KtDatePicker }
export default KtDatePicker
