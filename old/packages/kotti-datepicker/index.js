import KtDateInput from './src/DateInput'
import KtDatePicker from './src/DatePicker'

KtDatePicker.install = function(Vue) {
	Vue.component(KtDateInput.name, KtDateInput)
	Vue.component(KtDatePicker.name, KtDatePicker)
}

export { KtDateInput, KtDatePicker }
export default KtDatePicker
