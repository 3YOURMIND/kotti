import dayjs from 'dayjs'
import { ref, type Ref } from 'vue'

import { useForceUpdate } from '../kotti-field/hooks'

import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'

export const useSaveOnBlur = (options: {
	mode: 'date' | 'date-time'
	save: (value: string | null) => void
}): {
	forceUpdateKey: Ref<number>
	inputString: Ref<string | null>
	onBlur: () => void
	onInput: (event: InputEvent) => void
} => {
	const inputString = ref<string | null>(null)

	const { forceUpdate, forceUpdateKey } = useForceUpdate()

	const formatString = {
		date: 'YYYY-MM-DD',
		'date-time': 'YYYY-MM-DD HH:mm',
	}[options.mode]

	return {
		forceUpdateKey,
		inputString,
		onBlur: () => {
			// try is used to execute the finally block after returning from the try block
			try {
				if (inputString.value === null) return

				if (inputString.value === '') {
					options.save(null)
					return
				}

				const date = dayjs(inputString.value)

				if (DATE_FORMAT_REGEX.test(inputString.value) && date.isValid()) {
					options.save(date.format(formatString))
					return
				}

				if (
					options.mode === 'date-time' &&
					DATE_TIME_FORMAT_REGEX.test(inputString.value) &&
					date.isValid()
				) {
					options.save(date.format(formatString))
					return
				}
			} finally {
				inputString.value = null
				forceUpdate()
			}
		},
		onInput: (event: InputEvent) => {
			inputString.value = (event.target as HTMLInputElement).value
		},
	}
}
