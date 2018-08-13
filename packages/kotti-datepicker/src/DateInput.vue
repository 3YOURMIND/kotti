<template>
	<div v-on-clickaway="handleBlur">
		<div class="form-group">
			<label class="form-label" v-text="'label'" />
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					@focus.prevent="handleFocus"
					class="form-input"
					v-model="formatedDate"
				/>
				<i class="form-icon yoco" v-text="'calendar'" />
			</div>
		</div>
		<div v-if="showDatePicker"  >
			<KtDatePicker @KtDateSelected="setDate" />
		</div>
		</div>
</template>

<script>
import KtDatePicker from './DatePicker'
import { mixin as clickaway } from '../../mixin/vue-clickaway'
export default {
	name: 'KtDateInput',
	mixins: [clickaway],
	// props: {
	// 	formatedDate: String
	// },
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
		},
	},
}
</script>

<style scoped>
.kt-dateinput {
	position: relative;
}
</style>
