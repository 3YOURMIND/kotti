import { makeInstallable } from '../next/utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtDateInput from './DateInput.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtDatePicker from './DatePicker.vue'

makeInstallable(KtDateInput)
makeInstallable(KtDatePicker)

export { KtDateInput, KtDatePicker }
