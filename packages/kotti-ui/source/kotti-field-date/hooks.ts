import { ref } from 'vue'
import dayjs from 'dayjs'

import { useForceUpdate } from '../kotti-field/hooks'
import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'

export const useSaveOnBlur = ({
	mode,
	save,
}: {
	mode: 'date' | 'date-time'
	save(value: string | null): void
}) => {
	const inputString = ref<string | null>(null)

	const { forceUpdate, forceUpdateKey } = useForceUpdate()

	const formatString = {
		date: 'YYYY-MM-DD',
		'date-time': 'YYYY-MM-DD HH:mm',
	}[mode]

	return {
		forceUpdateKey,
		inputString,
		onBlur: () => {
			// try is used to execute the finally block after returning from the try block
			try {
				if (inputString.value === null) return

				if (inputString.value === '') {
					save(null)
					return
				}

				const date = dayjs(inputString.value)

				if (DATE_FORMAT_REGEX.test(inputString.value) && date.isValid()) {
					save(date.format(formatString))
					return
				}

				if (
					mode === 'date-time' &&
					DATE_TIME_FORMAT_REGEX.test(inputString.value) &&
					date.isValid()
				) {
					save(date.format(formatString))
					return
				}
			} finally {
				inputString.value = null
				forceUpdate()
			}
		},
		onInput: (event: InputEvent) => {
			inputString.value = (event.target as HTMLInputElement).value as string
		},
	}
}
