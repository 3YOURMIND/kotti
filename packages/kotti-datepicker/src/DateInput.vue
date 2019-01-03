<template>
	<div v-on-clickaway="handleBlur">
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					@focus.prevent="handleFocus"
					class="form-input"
					:value="formattedDate"
				/>
				<i class="form-icon yoco" v-text="'calendar'" />
			</div>
			<div v-if="showDatePicker">
				<KtDatePicker
					:mondayFirst="mondayFirst"
					:selectedDate="currentDate"
					:daysTranslations="daysTranslations"
					:monthsTranslations="monthsTranslations"
					@KtDateSelected="setDate"
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
	mixins: [clickaway],
	props: {
		initialValue: { types: [Date, Number, String] },
		label: { type: String, default: null },
		mondayFirst: { type: Boolean, default: false },
		daysTranslations: { type: Array },
		monthsTranslations: { type: Array },
	},
	components: {
		KtDatePicker,
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
	},
	watch: {
		initialValue: {
			handler(value) {
				this.currentDate = value ? new Date(value) : null
			},
			immediate: true,
		},
	},
	methods: {
		handleFocus() {
			this.showDatePicker = true
		},
		handleBlur() {
			this.showDatePicker = false
		},
		setDate(value) {
			this.currentDate = value
			this.showDatePicker = false
			this.$emit('input', value)
		},
	},
}
</script>
