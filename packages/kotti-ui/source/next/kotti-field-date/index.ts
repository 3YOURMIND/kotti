import { makeInstallable } from '../utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldDate from './KtFieldDate.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldDateRange from './KtFieldDateRange.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldDateTime from './KtFieldDateTime.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldDateTimeRange from './KtFieldDateTimeRange.vue'

makeInstallable(KtFieldDate)
makeInstallable(KtFieldDateRange)
makeInstallable(KtFieldDateTime)
makeInstallable(KtFieldDateTimeRange)

export { KtFieldDate, KtFieldDateRange, KtFieldDateTime, KtFieldDateTimeRange }
export * from './constants'
