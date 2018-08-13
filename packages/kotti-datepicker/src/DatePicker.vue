<template>
<div class="kt-dateinput">
	<div class="form-group">
		<label class="form-label" v-text="'label'" />
		<div class="has-icon-left">
			<input
				v-bind="$attrs"
				@focus="handleFocus"
				class="form-input"
				:value="selectedDate"
			/>
			<i class="form-icon yoco" v-text="'calendar'" />
		</div>
		<div class="form-validation-text" v-if="'validateText'">
			<span v-text="'validateText'" />
		</div>
	</div>
	<div class="kt-datepicker" v-if="showDatePicker">
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
				<div class="kt-datepicker-calendar__day-cell"
					v-for="d in dateOfMonth" :key="d.id" :class="dateStyle(d)"
					@click="handleDateSelected(d)">
					<span  v-text="d"/>
				</div>
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
			daysOfWeekString: dateUtils.weekString,
			monthsString: dateUtils.monthsString,
			mondayFirst: true,
			pageDate: new Date(),
			showDatePicker: false,
			selectedDate: null,
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
		handleFocus() {
			this.showDatePicker = true
		},
		handleBlur() {
			this.showDatePicker = false
		},
		handleDateSelected(d) {
			let date = this.pageDate
			date.setDate(d)
			this.selectedDate = new Date(date)
			this.showDatePicker = false
		},
		dateStyle(d) {
			const todayDate = new Date().getDate()
			const currentMonth = new Date().getMonth()
			const selectedDay = this.selectedDate ? this.selectedDate.getDate() : null
			if (d === todayDate && this.pageDate.getMonth() === currentMonth) {
				return 'kt-datepicker-calendar__day--today'
			}
			if (d === selectedDay) {
				return 'kt-datepicker-calendar__day--highlighted'
			}
		},
	},
}
</script>


<style scoped>
.kt-dateinput {
	position: relative;
}
.kt-datepicker {
	position: absolute;
	top: 3.2rem;
}
</style>
