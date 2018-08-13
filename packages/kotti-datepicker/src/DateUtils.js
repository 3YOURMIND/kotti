const util = {
	daysInMonth(year, month) {
		if (/8|3|5|10/.test(month)) {
			return 30
		}
		if (month === 1) {
			let isLoopYear = (!(year % 4) && year % 100) || !(year % 400)
			return isLoopYear ? 29 : 28
		}
		return 31
	},
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
	weekString: ['星期日', '月耀日', '화요일', 'Wed', 'Th', 'F', 'Sat'],
}
export default {
	...util,
}
