<template>
	<div class="kt-datepicker">
		<div class="kt-datepicker-header">
			<div class="kt-datepicker-header__date">
				<div class="kt-datepicker-header__month" v-text="monthRep" />
				<div class="kt-datepicker-header__year" v-text="yearRep" />
			</div>
			<div class="kt-datepicker-header__control">
				<i class="yoco" @click="changeMonth(-1)">chevron_left</i>
				<i class="yoco" @click="changeMonth(+1)">chevron_right</i>
			</div>
		</div>
		<div class="kt-datepicker-calendar">
			<div class="kt-datepicker-calendar__week">
				<span v-for="d in daysOfWeek" :key="d">{{d}}</span>
			</div>
			<div class="kt-datepicker-calendar__day">
				<div class="kt-datepicker-calendar__day-cell kt-datepicker-calendar__day--blank" v-for="d in daysOfBlank" :key="d.id">
					<span>{{d}}</span>
				</div>
				<div class="kt-datepicker-calendar__day-cell"
					v-for="d in dateOfMonth" :key="d.id" :class="dateStyle(d)"
					@click="handleDateSelected(d)">
					<span  v-text="d"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dateUtils from './DateUtils.js'

export default {
	name: 'KtDatePicker',
	props: {
		selectedDate: { type: Date, default: null },
		mondayFirst: { type: Boolean, default: false },
	},
	data() {
		return {
			daysOfWeekString: dateUtils.weekString,
			monthsString: dateUtils.monthsString,
			pageDate: new Date(),
		}
	},
	watch: {
		selectedDate: {
			immediate: true,
			handler: 'setPageDate',
		},
	},
	computed: {
		monthRep() {
			const d = this.pageDate
			return this.monthsString[d.getUTCMonth()]
		},
		yearRep() {
			const d = this.pageDate
			return d.getUTCFullYear()
		},
		daysOfWeek() {
			if (this.mondayFirst) {
				let tempDays = this.daysOfWeekString.slice()
				tempDays.push(tempDays.shift())
				return tempDays
			}
			return this.daysOfWeekString
		},
		daysOfBlank() {
			let d = this.pageDate
			let dObject = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
			if (this.mondayFirst) {
				return dObject.getDay() > 0 ? dObject.getDay() - 1 : 6
			}
			return dObject.getDay()
		},
		dateOfMonth() {
			const d = this.pageDate
			let _dateArrary = []
			for (
				let i = 1;
				i < dateUtils.daysInMonth(d.getUTCFullYear(), d.getUTCMonth()) + 1;
				i++
			) {
				_dateArrary.push(i)
			}
			return _dateArrary
		},
	},
	methods: {
		setPageDate() {
			let d = this.selectedDate
			this.pageDate = d ? new Date(d) : new Date()
		},
		changeMonth(incrementBy) {
			let d = this.pageDate
			let m = d.getUTCMonth() + incrementBy
			d = d.setUTCMonth(m)
			this.pageDate = new Date(d)
		},
		handleDateSelected(d) {
			let date = this.pageDate
			date.setDate(d)
			this.$emit('KtDateSelected', date)
			this.showDatePicker = false
		},
		dateStyle(d) {
			const todayDate = new Date().getDate()
			const currentMonth = new Date().getMonth()
			const selectedDay = this.selectedDate ? this.selectedDate.getDate() : null
			const selectedMonth = this.selectedDate
				? this.selectedDate.getMonth()
				: null
			let styleObject = []
			if (d === todayDate && currentMonth === this.pageDate.getMonth()) {
				styleObject.push('kt-datepicker-calendar__day--today')
			}
			if (d === selectedDay && selectedMonth === this.pageDate.getMonth()) {
				styleObject.push('kt-datepicker-calendar__day--highlighted')
			}
			return styleObject
		},
	},
}
</script>
