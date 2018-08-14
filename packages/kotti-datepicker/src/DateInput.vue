<template>
	<div v-on-clickaway="handleBlur">
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					@focus.prevent="handleFocus"
					class="form-input"
					:value="formatedDate"
				/>
				<i class="form-icon yoco" v-text="'calendar'" />
			</div>
			<div v-if="showDatePicker">
				<KtDatePicker
					@KtDateSelected="setDate"
					:selectedDate="currentDate"
					:mondayFirst="mondayFirst"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import KtDatePicker from './DatePicker'
import { mixin as clickaway } from '../../mixin/vue-clickaway'
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
			showDatePicker: false,
			currentDate: null,
		}
	},
	computed: {
		formatedDate() {
			if (this.currentDate) {
				return this.currentDate.toLocaleDateString()
			}
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
