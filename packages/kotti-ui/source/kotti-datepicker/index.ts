import { makeInstallable } from '../next/utilities'

import KtDateInput from './DateInput.vue'
import KtDatePicker from './DatePicker.vue'

makeInstallable(KtDateInput)
makeInstallable(KtDatePicker)

export { KtDateInput, KtDatePicker }
