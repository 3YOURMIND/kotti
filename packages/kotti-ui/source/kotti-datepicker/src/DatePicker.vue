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
import { TimeConversion } from '@metatypes/units'
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
				range(0, TimeConversion.DAYS_PER_WEEK - 1).map((day) =>
					dayjs().set('day', day).format('ddd'),
				),
		},
		mondayFirst: { type: Boolean, default: false },
		monthsTranslations: {
			type: Array,
			default: () =>
				range(0, TimeConversion.MONTHS_PER_YEAR - 1).map((month) =>
					dayjs().set('date', 1).set('month', month).format('MMMM'),
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
			return (
				(this.mondayFirst ? day + (TimeConversion.DAYS_PER_WEEK - 1) : day) %
				TimeConversion.DAYS_PER_WEEK
			)
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
			this.$emit('KtMonthChanged', this.date.toDate())
		},
		monthNext() {
			this.date = this.date.add(1, 'month')
			this.$emit('KtMonthChanged', this.date.toDate())
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
