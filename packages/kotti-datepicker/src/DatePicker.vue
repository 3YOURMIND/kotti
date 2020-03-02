<template>
	<div class="kt-datepicker">
		<div class="kt-datepicker-header">
			<div class="kt-datepicker-header__date">
				<div class="kt-datepicker-header__month" v-text="monthText" />
				<div class="kt-datepicker-header__year" v-text="yearText" />
			</div>
			<div class="kt-datepicker-header__control">
				<i class="yoco" @click="monthPrevious" v-text="'chevron_left'" />
				<i class="yoco" @click="monthNext" v-text="'chevron_right'" />
			</div>
		</div>
		<div class="kt-datepicker-calendar">
			<div class="kt-datepicker-calendar__week">
				<span v-for="day in daysOfWeek" :key="day" v-text="day" />
			</div>
			<div class="kt-datepicker-calendar__day">
				<div
					v-for="(day, index) in daysOfBlank"
					:key="`blank${index}`"
					class="kt-datepicker-calendar__day-cell kt-datepicker-calendar__day--blank"
				>
					<span v-text="day" />
				</div>

				<div
					v-for="(day, index) in daysRange"
					:key="`day${index}`"
					:class="dayStyle(day)"
					@click="selectDay(day)"
				>
					<span v-text="day" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs'

const range = (start, end) => {
	const result = []
	for (let i = start; i <= end; i++) result.push(i)
	return result
}

export default {
	name: 'KtDatePicker',
	props: {
		daysTranslations: {
			type: Array,
			default: () =>
				range(0, 6).map((day) =>
					dayjs()
						.set('day', day)
						.format('ddd'),
				),
		},
		mondayFirst: { type: Boolean, default: false },
		monthsTranslations: {
			type: Array,
			default: () =>
				range(0, 11).map((month) =>
					dayjs()
						.set('date', 1)
						.set('month', month)
						.format('MMMM'),
				),
		},
		selectedDate: { type: Date, default: null },
	},
	data() {
		return { date: null }
	},
	computed: {
		selected() {
			return dayjs(this.selectedDate).startOf('date')
		},
		monthText() {
			return this.monthsTranslations[this.date.month()]
		},
		yearText() {
			return this.date.year()
		},
		daysRange() {
			return range(1, this.date.daysInMonth())
		},
		daysOfWeek() {
			const [sun, mon, tue, wed, thu, fri, sat] = this.daysTranslations

			return this.mondayFirst
				? [mon, tue, wed, thu, fri, sat, sun]
				: [sun, mon, tue, wed, thu, fri, sat]
		},
		daysOfBlank() {
			const day = this.date.day()
			// use +6 instead of -1 because negative numbers will yield
			// negative results when using the division rest operator (%)
			return (this.mondayFirst ? day + 6 : day) % 7
		},
	},
	watch: {
		selectedDate: {
			immediate: true,
			handler: 'onSelectedDateChange',
		},
	},
	methods: {
		monthPrevious() {
			this.date = this.date.subtract(1, 'month')
		},
		monthNext() {
			this.date = this.date.add(1, 'month')
		},
		selectDay(day) {
			this.date = this.date.set('date', day)
			this.$emit('KtDateSelected', this.date.toDate())
		},
		dayStyle(dayOfMonth) {
			const date = this.date.set('date', dayOfMonth)
			const today = dayjs().startOf('date')

			const isToday = date.isSame(today)
			const isSelected = date.isSame(this.selected)

			const styles = ['kt-datepicker-calendar__day-cell']

			if (isToday) styles.push('kt-datepicker-calendar__day--today')
			if (isSelected) styles.push('kt-datepicker-calendar__day--highlighted')

			return styles
		},
		onSelectedDateChange(selectedDate) {
			this.date = dayjs(selectedDate || undefined).startOf('month')
		},
	},
}
</script>
<style lang="scss">
$span-width: 1.6rem;
.kt-dateinput {
	position: relative;
}
.kt-datepicker {
	position: absolute;
	top: 3.2rem;
	z-index: $zindex-4;
	box-sizing: border-box;
	width: $span-width * 8;
	padding: $span-width/2;
	background: #fff;
	border-radius: $border-radius;
	box-shadow: $box-shadow;
}
.kt-datepicker-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	&__month {
		font-size: 1.2rem;
		font-weight: 600;
	}
	&__year {
		color: $darkgray-300;
	}
	&__control i {
		color: $darkgray-300;
		user-select: none;
		&:hover {
			color: $darkgray-500;
			cursor: pointer;
		}
	}
}
.kt-datepicker-calendar {
	&__week {
		width: 100%;
		margin: 0.2rem;
		font-size: 0.6rem;
		font-weight: 600;
		line-height: 1.6rem;
		color: $darkgray-300;
		text-align: center;
		span {
			display: inline-block;
			width: $span-width;
		}
	}
	&__day {
		width: 100%;
	}
	&__day-cell {
		display: block;
		float: left;
		width: $span-width;
		height: $span-width;
		padding: 0.2rem;
		text-align: center;
		user-select: none;
		&:hover {
			cursor: pointer;
		}
		span {
			display: inline-block;
			width: 1.6rem;
			line-height: 1.6rem;
			border-radius: 100%;
			&:hover {
				color: #fff;
				background: $primary-300;
			}
		}
	}
	&__day--blank {
		opacity: 0;
		&:hover {
			cursor: default;
		}
	}
	&__day--highlighted span {
		color: #fff;
		background: $primary-400;
		border-radius: 100%;
		box-shadow: inset 0 0 0 0.1rem $primary-500;
	}

	&__day--today {
		font-weight: 600;
		color: $primary-500;
	}
	&__day--start,
	&__day--end {
		color: #fff;
		background: $primary-300;
		border-radius: 100% 0 0 100%;
		span {
			background: $primary-400;
			border-radius: 100%;
			box-shadow: inset 0 0 0 0.1rem $primary-500;
		}
	}
	&__day--end {
		border-radius: 0 100% 100% 0;
	}
	&__day--between {
		margin: 0;
		color: #fff;
		background: $primary-300;
	}
}
</style>
