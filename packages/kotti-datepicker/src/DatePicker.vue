<template>
	<div class="kt-datepicker">
		<div class="kt-datepicker-header">
			<div class="kt-datepicker-header__date">
				<div class="kt-datepicker-header__month" v-text="monthRep" />
				<div class="kt-datepicker-header__year" v-text="yearRep" />
			</div>
			<div class="kt-datepicker-header__control">
				<i class="yoco" @click="monthDecrease">chevron_left</i>
				<i class="yoco" @click="monthIncrease">chevron_right</i>
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
				<div class="kt-datepicker-calendar__day-cell" v-for="d in dateOfMonth" :key="d.id" :class="dateStyle(d)">
					<span>{{d}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dateUtils from './DateUtils.js'

export default {
	name: 'KtDatePicker',
	data() {
		return {
			daysOfWeekString: ['星期日', '月耀日', '화요일', 'Wed', 'Th', 'F', 'Sat'],
			monthsString: [
				'一月',
				'January',
				'Feb',
				'April',
				'May',
				'六月',
				'July',
				'August',
				'September',
				'October',
				'Nov.',
				'December',
			],
			mondayFirst: true,
			pageDate: new Date(),
		}
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
		changeMonth(incrementBy) {
			let d = this.pageDate
			let m = d.getUTCMonth() + incrementBy
			d = d.setUTCMonth(m)
			this.pageDate = new Date(d)
		},
		monthIncrease() {
			this.changeMonth(+1)
		},
		monthDecrease() {
			this.changeMonth(-1)
		},
		dateStyle(d) {
			if (d === 1) {
				return 'kt-datepicker-calendar__day--start'
			}
			if (d === 4) {
				return 'kt-datepicker-calendar__day--end'
			}
			if (d < 5 && d > 1) {
				return 'kt-datepicker-calendar__day--between'
			}
			if (d === 10) {
				return 'kt-datepicker-calendar__day--highlighted'
			}
			if (d === 22) {
				return 'kt-datepicker-calendar__day--today'
			}
		},
	},
}
</script>
