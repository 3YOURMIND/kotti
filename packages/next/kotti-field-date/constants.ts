import { Dashes } from '@metatypes/typography'
import ElementLocale from 'element-ui/lib/locale'
// import german from 'element-ui/lib/locale/lang/de'
import english from 'element-ui/lib/locale/lang/en'
// import french from 'element-ui/lib/locale/lang/fr'
// import japanese from 'element-ui/lib/locale/lang/ja'

//TODO inject context, and fetch locale key
ElementLocale.use(english)

export const COMMON_INTERNAL_PROPS = {
	clearable: true,
	editable: true,
}

export const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}/

export const DATE_INTERNAL_PROPS = {
	format: 'yyyy-MM-dd',
	valueFormat: 'yyyy-MM-dd',
}

export const DATE_TIME_INTERNAL_PROPS = {
	format: 'yyyy-MM-dd HH:mm',
	valueFormat: 'yyyy-MM-dd[T]HH:mm:ss',
}

export const DATE_TIME_FORMAT_REGEX = /\d{4}-\d{2}-\d{2}(\[T\]| )\d{2}:\d{2}(:\d{2})?/

export const RANGE_INTERNAL_PROPS = {
	rangeSeparator: Dashes.EnDash,
}
