import { makeInstallable } from '../utilities'

import KtFieldDate from './KtFieldDate.vue'
import KtFieldDateRange from './KtFieldDateRange.vue'
import KtFieldDateTime from './KtFieldDateTime.vue'
import KtFieldDateTimeRange from './KtFieldDateTimeRange.vue'

makeInstallable(KtFieldDate)
makeInstallable(KtFieldDateRange)
makeInstallable(KtFieldDateTime)
makeInstallable(KtFieldDateTimeRange)

export { KtFieldDate, KtFieldDateRange, KtFieldDateTime, KtFieldDateTimeRange }
