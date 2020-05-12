<template>
	<div v-on-clickaway="handleBlur">
		<div class="form-group">
			<label v-if="hasLabel" class="form-label" v-text="labelRep" />
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					class="form-input"
					:required="required"
					:value="formattedDate"
					@focus.prevent="handleFocus"
				/>
				<i class="form-icon yoco" v-text="'calendar'" />
			</div>
			<div v-if="showDatePicker">
				<KtDatePicker
					:daysTranslations="daysTranslations"
					:mondayFirst="mondayFirst"
					:monthsTranslations="monthsTranslations"
					:selectedDate="currentDate"
					@KtDateSelected="setDate"
					@KtMonthChanged="setDate($event, true)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

// components
import KtDatePicker from './DatePicker'

export default {
	name: 'KtDateInput',
	components: {
		KtDatePicker,
	},
	mixins: [clickaway],
	props: {
		daysTranslations: { type: Array },
		label: { type: String, default: null },
		mondayFirst: { type: Boolean, default: false },
		monthsTranslations: { type: Array },
		required: { type: Boolean, default: false },
		value: { type: [Date, Number, String] },
	},
	data() {
		return {
			currentDate: null,
			showDatePicker: false,
		}
	},
	computed: {
		formattedDate() {
			if (this.currentDate) return this.currentDate.toLocaleDateString()
			return null
		},
		hasLabel() {
			return this.label && this.label.length
		},
		labelRep() {
			return `${this.label}${this.required ? ' *' : ''}`
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(value) {
				this.currentDate = value ? new Date(value) : null
			},
		},
	},
	methods: {
		handleFocus() {
			this.showDatePicker = true
		},
		handleBlur() {
			this.showDatePicker = false
		},
		setDate(value, showDatePicker = false) {
			this.currentDate = value
			this.showDatePicker = showDatePicker
			this.$emit('input', value)
		},
	},
}
</script>
