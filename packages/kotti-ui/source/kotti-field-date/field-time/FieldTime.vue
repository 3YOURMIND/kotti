<template>
	<div ref="componentRef" class="time-picker" role="group" :tabindex="-1">
		<div ref="rowRef" class="time-picker__table">
			<div
				v-for="type in ['hours', 'minutes']"
				:key="type"
				class="time-picker__column"
			>
				<div class="time-picker__header-cell">{{ locale?.[type] }}</div>
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
							{{ i }}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { TimeConversion } from '@metatypes/units'
import { defineComponent, ref, onMounted, watch, computed } from 'vue'
import type { PropType } from 'vue'

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
		const container = row.querySelector(`[data-type="${type}"]`)
		const node = container?.querySelector(`[data-key="${type}-${value}"]`)

		if (node && container) {
			const position = getPosition(node, container)

			scrollTopAnimation(container, position.top, scrollTop(container) !== 0)
		}
	})
}

export default defineComponent({
	name: 'TimeDropdown',
	props: {
		format: { type: String, default: 'yyyy-MM-DD HH:mm:ss' },
		/**
		 * @deprecated TODO: Use kt i18n context instead
		 */
		locale: {
			default: () => ({
				hours: 'Hours',
				minutes: 'Minutes',
				seconds: 'Seconds',
			}),
			type: Object as PropType<Record<TimeUnit, string>>,
		},

		// years
		years: { required: true, type: Number },

		// months
		months: { required: true, type: Number },

		// days
		days: { required: true, type: Number },

		// hours
		disabledHours: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		hideHours: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		hours: { required: true, type: Number },

		// minutes
		disabledMinutes: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		hideMinutes: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		minutes: { required: true, type: Number },

		// seconds
		disabledSeconds: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		hideSeconds: {
			default: () => false,
			type: Function as PropType<(dateRecord: DateRecord) => boolean>,
		},
		seconds: { required: true, type: Number },
	},
	emits: ['click', 'update:hours', 'update:minutes', 'update:seconds'],
	setup(props, { emit }) {
		const rowRef = ref<HTMLDivElement | null>(null)
		const componentRef = ref<HTMLDivElement | null>(null)

		const time = computed<TimeRecord>(() => ({
			hours: props.hours,
			minutes: props.minutes,
			seconds: props.seconds,
		}))

		// const date = computed<DateRecord>(() => ({
		// 	years: props.years,
		// 	months: props.months,
		// 	days: props.days,
		// 	hours: props.hours,
		// 	minutes: props.minutes,
		// 	seconds: props.seconds,
		// }))

		onMounted(() => {
			if (rowRef.value) {
				scrollTo(time.value, rowRef.value)
			}
		})

		watch([() => time.value, () => props.format], ([newTime, _]) => {
			if (rowRef.value) {
				scrollTo(newTime, rowRef.value)
			}
		})

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
			}
		}

		const displayedNumbersForType = (timeUnit: TimeUnit) => {
			const shownTimeEntries: number[] = []
			const maximumTimeUnit =
				timeUnit === 'hours'
					? TimeConversion.HOURS_PER_DAY
					: TimeConversion.MINUTES_PER_HOUR

			const dayRecord: Record<Exclude<DateUnit, TimeUnit>, number> = {
				years: props.years,
				months: props.months,
				days: props.days,
			}

			for (let i = 0; i < maximumTimeUnit; i++) {
				const dateRecord: DateRecord = {
					...dayRecord,
					hours: timeUnit === 'hours' ? i : props.hours,
					minutes: timeUnit === 'minutes' ? i : props.minutes,
					seconds: timeUnit === 'seconds' ? i : props.seconds,
				}

				switch (timeUnit) {
					case 'hours':
						if (!props.hideHours(dateRecord)) shownTimeEntries.push(i)
					case 'minutes':
						if (!props.hideMinutes(dateRecord)) shownTimeEntries.push(i)
					case 'seconds':
						if (!props.hideSeconds(dateRecord)) shownTimeEntries.push(i)
				}
			}

			return shownTimeEntries.map((number) => {
				const dateRecord: DateRecord = {
					...dayRecord,
					hours: timeUnit === 'hours' ? number : props.hours,
					minutes: timeUnit === 'minutes' ? number : props.minutes,
					seconds: timeUnit === 'seconds' ? number : props.seconds,
				}

				const isDisabled = (() => {
					switch (timeUnit) {
						case 'hours':
							return props.disabledHours(dateRecord)
						case 'minutes':
							return props.disabledMinutes(dateRecord)
						case 'seconds':
							return props.disabledSeconds(dateRecord)
					}
				})()

				const isSelected = props[timeUnit] === number

				return {
					ariaLabel: `${number} ${timeUnit}`,
					classes: {
						'time-picker__cell--is-disabled': isDisabled,
						'time-picker__cell--is-selected': isSelected,
					},
					displayedNumber: number,
					isDisabled,
					isSelected,
					onClick: isDisabled
						? undefined
						: () => {
								handleClick(timeUnit, number)
							},
				}
			})
		}

		return {
			componentRef,
			displayedNumbersForType,
			rowRef,
		}
	},
})
</script>

<style lang="scss" scoped>
.time-picker {
	font-size: 14px;
	overflow: hidden;
	padding: 6px 8px;
	width: 100%;

	&__table {
		display: table;
		width: 100%;
	}

	&__column {
		display: table-cell;

		> ul {
			height: 270px;
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
