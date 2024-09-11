<template>
	<div ref="componentRef" class="time-picker" role="group" :tabindex="-1">
		<div ref="rowRef" class="time-picker__rows">
			<div
				v-for="type in ['hours', 'minutes']"
				:key="type"
				class="time-picker__column"
			>
				<div class="time-picker__header-cell">{{ translations[type] }}</div>
				<div class="time-picker__header-separator" />
				<ul :aria-label="`Select ${type}`" :data-type="type" role="listbox">
					<li
						v-for="entry in displayedNumbersForType(type)"
						:key="entry.displayedNumber"
						:aria-disabled="entry.isDisabled"
						:aria-label="entry.ariaLabel"
						:aria-selected="entry.isSelected"
						:data-key="entry.dataKey"
						role="option"
						tabindex="-1"
						@click="entry.onClick"
					>
						<span :class="['time-picker__cell', entry.classes]">
							{{ entry.displayedNumber }}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { TimeConversion } from '@metatypes/units'
import range from 'lodash/range'
import { defineComponent, onMounted, ref, computed } from 'vue'
import type { PropType } from 'vue'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'

type TimeUnit = 'hours' | 'minutes' | 'seconds'
type TimeRecord = Record<TimeUnit, number>
type DateUnit = 'years' | 'months' | 'days' | TimeUnit
type DateRecord = Record<DateUnit, number>

export function getPosition(
	node: Element,
	container: Element,
): { top: number; left: number } {
	const nodeRect = node.getBoundingClientRect()
	const containerRect = container.getBoundingClientRect()

	return {
		top: nodeRect.top - containerRect.top,
		left: nodeRect.left - containerRect.left,
	}
}

export function scrollTop(
	element: Element,
	value?: number,
): number | undefined {
	if (value === undefined) {
		return element.scrollTop
	} else {
		element.scrollTop = value
	}
}

function easeInOutQuad(t: number) {
	// eslint-disable-next-line no-magic-numbers
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function scrollTopAnimation(
	element: Element,
	to: number,
	animated = true,
): void {
	const start = element.scrollTop
	const change = to - start
	// eslint-disable-next-line no-magic-numbers
	const duration = animated ? 300 : 0
	const startTime = performance.now()

	function animateScroll(currentTime: number) {
		const timeElapsed = currentTime - startTime
		const progress = Math.min(timeElapsed / duration, 1)
		const easing = easeInOutQuad(progress)

		element.scrollTop = start + change * easing

		if (progress < 1) {
			window.requestAnimationFrame(animateScroll)
		}
	}

	window.requestAnimationFrame(animateScroll)
}

function scrollTo(time: TimeRecord, row: HTMLDivElement | null) {
	if (!row) return

	Object.entries(time).forEach(([type, value]: [string, number]) => {
		const scrollToValue = Math.max(0, value - 3)

		const container = row.querySelector(`[data-type="${type}"]`)
		const node = container?.querySelector(
			`[data-key="${type}-${scrollToValue}"]`,
		)

		if (node && container) {
			const position = getPosition(node, container)

			scrollTopAnimation(container, position.top, scrollTop(container) !== 0)
		}
	})
}

type DisabledFunction = (dateRecord: DateRecord) => boolean
type HideFunction = (dateRecord: DateRecord) => boolean

export default defineComponent({
	name: 'TimeDropdown',
	props: {
		format: { type: String, default: 'yyyy-MM-DD HH:mm:ss' },

		// years
		years: { required: true, type: Number },

		// months
		months: { required: true, type: Number },

		// days
		days: { required: true, type: Number },

		// hours
		disabledHours: {
			default: () => false,
			type: Function as PropType<DisabledFunction>,
		},
		hideHours: {
			default: () => false,
			type: Function as PropType<HideFunction>,
		},
		hours: { required: true, type: Number },

		// minutes
		disabledMinutes: {
			default: () => false,
			type: Function as PropType<DisabledFunction>,
		},
		hideMinutes: {
			default: () => false,
			type: Function as PropType<HideFunction>,
		},
		minutes: { required: true, type: Number },

		// seconds
		disabledSeconds: {
			default: () => false,
			type: Function as PropType<DisabledFunction>,
		},
		hideSeconds: {
			default: () => false,
			type: Function as PropType<HideFunction>,
		},
		seconds: { required: true, type: Number },
	},
	emits: ['update:hours', 'update:minutes', 'update:seconds'],
	setup(props, { emit }) {
		const rowRef = ref<HTMLDivElement | null>(null)
		const componentRef = ref<HTMLDivElement | null>(null)

		const translations = useTranslationNamespace('KtFieldDateShared')

		const time = computed<TimeRecord>(() => ({
			hours: props.hours,
			minutes: props.minutes,
			seconds: props.seconds,
		}))

		const getAdjustedDate = (type: TimeUnit, unit: number) => ({
			years: props.years,
			months: props.months,
			days: props.days,
			hours: props.hours,
			minutes: props.minutes,
			seconds: props.seconds,
			[type]: unit,
		})

		onMounted(() => {
			if (rowRef.value) {
				scrollTo(time.value, rowRef.value)
			}
		})

		// watch(
		// 	[() => time.value, () => props.format],
		// 	([newTime, _]) => {
		// 		if (rowRef.value) {
		// 			scrollTo(newTime, rowRef.value)
		// 		}
		// 	},
		// 	{ immediate: true },
		// )

		const handleClick = (type: TimeUnit, unit: number) => {
			switch (type) {
				case 'hours':
					emit('update:hours', unit)
					break
				case 'minutes':
					emit('update:minutes', unit)
					break
				case 'seconds':
					emit('update:seconds', unit)
					break
				default:
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					throw new Error(`invalid type ${type}`)
			}
		}

		const getEntries = (
			// eslint-disable-next-line no-magic-numbers
			maxNumber: 24 | 60,
			type: TimeUnit,
			hideFunction: HideFunction,
			disabledFunction: DisabledFunction,
		) =>
			range(maxNumber)
				.map((unit) => getAdjustedDate(type, unit))
				.filter((dateRecord) => !hideFunction(dateRecord))
				.map((dateRecord) => {
					const number = dateRecord[type]
					const isDisabled = disabledFunction(dateRecord)

					const isSelected = props[type] === number

					return {
						ariaLabel: `${number} ${type}`,
						classes: {
							'time-picker__cell--is-disabled': isDisabled,
							'time-picker__cell--is-selected': isSelected,
						},
						dataKey: `${type}-${number}`,
						displayedNumber: number,
						isDisabled,
						isSelected,
						onClick: () => {
							if (isDisabled) return

							handleClick(type, number)
						},
					}
				})

		const displayedNumbersForType = (timeUnit: TimeUnit) => {
			switch (timeUnit) {
				case 'hours':
					return getEntries(
						TimeConversion.HOURS_PER_DAY,
						'hours',
						props.hideHours,
						props.disabledHours,
					)
				case 'minutes':
					return getEntries(
						TimeConversion.MINUTES_PER_HOUR,
						'minutes',
						props.hideMinutes,
						props.disabledMinutes,
					)
				case 'seconds':
					return getEntries(
						TimeConversion.SECONDS_PER_MINUTE,
						'seconds',
						props.hideSeconds,
						props.disabledSeconds,
					)
			}
			// const shownTimeEntries: number[] = []
			// const maximumTimeUnit =
			// 	timeUnit === 'hours'
			// 		? TimeConversion.HOURS_PER_DAY
			// 		: TimeConversion.MINUTES_PER_HOUR

			// const dayRecord: Record<Exclude<DateUnit, TimeUnit>, number> = {
			// 	years: props.years,
			// 	months: props.months,
			// 	days: props.days,
			// }

			// for (let i = 0; i < maximumTimeUnit; i++) {
			// 	const dateRecord: DateRecord = {
			// 		...dayRecord,
			// 		hours: timeUnit === 'hours' ? i : props.hours,
			// 		minutes: timeUnit === 'minutes' ? i : props.minutes,
			// 		seconds: timeUnit === 'seconds' ? i : props.seconds,
			// 	}

			// 	switch (timeUnit) {
			// 		case 'hours':
			// 			if (!props.hideHours(dateRecord)) shownTimeEntries.push(i)
			// 		case 'minutes':
			// 			if (!props.hideMinutes(dateRecord)) shownTimeEntries.push(i)
			// 		case 'seconds':
			// 			if (!props.hideSeconds(dateRecord)) shownTimeEntries.push(i)
			// 	}
			// }

			// return shownTimeEntries.map((number) => {
			// 	const dateRecord: DateRecord = {
			// 		...dayRecord,
			// 		hours: timeUnit === 'hours' ? number : props.hours,
			// 		minutes: timeUnit === 'minutes' ? number : props.minutes,
			// 		seconds: timeUnit === 'seconds' ? number : props.seconds,
			// 	}

			// 	const isDisabled = (() => {
			// 		switch (timeUnit) {
			// 			case 'hours':
			// 				return props.disabledHours(dateRecord)
			// 			case 'minutes':
			// 				return props.disabledMinutes(dateRecord)
			// 			case 'seconds':
			// 				return props.disabledSeconds(dateRecord)
			// 		}
			// 	})()

			// 	const isSelected = props[timeUnit] === number

			// 	return {
			// 		ariaLabel: `${number} ${timeUnit}`,
			// 		classes: {
			// 			'time-picker__cell--is-disabled': isDisabled,
			// 			'time-picker__cell--is-selected': isSelected,
			// 		},
			// 		displayedNumber: number,
			// 		isDisabled,
			// 		isSelected,
			// 		onClick: isDisabled
			// 			? undefined
			// 			: () => {
			// 					handleClick(timeUnit, number)
			// 				},
			// 	}
			// })
		}

		return {
			componentRef,
			displayedNumbersForType,
			rowRef,
			translations,
		}
	},
})
</script>

<style lang="scss" scoped>
.time-picker {
	font-size: 14px;
	overflow: hidden;
	padding: 6px 8px;
	height: 100%;
	/* width: 100%; */

	&__rows {
		display: flex;
		align-items: stretch;
		height: 100%;
		/* width: 100%; */
	}

	&__column {
		flex-basis: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		> ul {
			flex: 1;
			overflow-y: auto;
		}

		> ul,
		> ul > li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

	&__header-cell {
		/* font-size: 12px;
		text-transform: uppercase;
		background-color: var(--ui-01);
		color: var(--gray-50);
		padding-bottom: 2px;
		padding-top: 2px;
		text-align: center;
		width: 100%; */

		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		font-size: 0.6rem;
		color: var(--text-03);
		text-transform: uppercase;
		font-weight: 700;

		/* align-items: center;
		color: var(--dp-text-color);
		white-space: nowrap; */
	}

	&__header-separator {
		width: 100%;
		height: 1px;
		background: var(--dp-border-color);
	}

	&__cell {
		color: inherit;
		padding: 5px;
		display: block;
		text-align: center;
		cursor: pointer;

		&--is-selected {
			color: var(--interactive-03);
			background-color: var(--ui-05);
		}

		&--is-disabled {
			color: var(--text-05);
			opacity: 0.46;
		}

		&:not(.time-picker__cell--is-disabled) {
			&:hover {
				background-color: var(--ui-01);

				&.kt-select-options-item--is-selected {
					color: var(--interactive-01-hover);
				}
			}
		}
	}
}
</style>
