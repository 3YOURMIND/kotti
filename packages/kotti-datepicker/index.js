import KtDatePicker from './src/DatePicker'
import KtDateInput from './src/DateInput'

KtDatePicker.install = function(Vue) {
	Vue.component(KtDateInput.name, KtDateInput)
	Vue.component(KtDatePicker.name, KtDatePicker)
}

export { KtDateInput, KtDatePicker }
export default KtDatePicker
