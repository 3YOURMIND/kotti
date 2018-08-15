<template>
	<div v-on-clickaway="handleBlur">
		<div class="form-group">
			<label
				class="form-label"
				v-text="label"
			/>
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					@focus.prevent="handleFocus"
					class="form-input"
					:value="formatedDate"
				/>
				<i
					class="form-icon yoco"
					v-text="'calendar'"
				/>
			</div>
			<div v-if="showDatePicker">
				<KtDatePicker
					:mondayFirst="mondayFirst"
					:selectedDate="currentDate"
					@KtDateSelected="setDate"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from '../../mixin/vue-clickaway'

// components
import KtDatePicker from './DatePicker'

export default {
	name: 'KtDateInput',
	mixins: [clickaway],
	props: {
		label: { type: String, default: null },
		mondayFirst: { type: Boolean, default: false },
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
		formatedDate() {
			if (this.currentDate) return this.currentDate.toLocaleDateString()

			return null
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
