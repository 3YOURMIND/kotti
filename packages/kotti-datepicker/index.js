import KtDatePicker from './src/DatePicker'
import KtDateInput from './src/DateInput'

KtDateInput.install = function(Vue) {
	Vue.component(KtDateInput.name, KtDateInput)
}

KtDatePicker.install = function(Vue) {
	Vue.component(KtDatePicker.name, KtDatePicker)
}

export { KtDateInput, KtDatePicker }
