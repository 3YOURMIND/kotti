<template>
	<div v-on-clickaway="handleBlur">
		<div ref="input" class="form-group">
			<label v-if="hasLabel" class="form-label" v-text="labelRep" />
			<div class="has-icon-left">
				<input
					v-bind="$attrs"
					class="form-input"
					:value="formattedDate"
					:required="required"
					@focus.prevent="handleFocus"
				/>
				<i class="form-icon yoco" v-text="'calendar'" />
			</div>
			<Portal>
				<div v-if="showDatePicker">
					<KtDatePicker
						:style="selectorOptionStyle"
						:mondayFirst="mondayFirst"
						:value="currentDate"
						:daysTranslations="daysTranslations"
						:monthsTranslations="monthsTranslations"
						@input="setDate"
					/>
				</div>
			</Portal>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { isBrowser } from '../../util'

// components
import KtDatePicker from './DatePicker'
import { Portal } from '../../util/portal'

const POPPER_OFFSET = 4

export default {
	name: 'KtDateInput',
	components: {
		KtDatePicker,
		Portal,
	},
	mixins: [clickaway],
	props: {
		initialValue: { type: [Date, Number, String] },
		label: { type: String, default: null },
		mondayFirst: { type: Boolean, default: false },
		daysTranslations: { type: Array },
		monthsTranslations: { type: Array },
		required: { type: Boolean, default: false },
	},
	data() {
		return {
			currentDate: null,
			showDatePicker: false,
			selectorOptionStyle: '',
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
		initialValue: {
			handler(value) {
				this.currentDate = value ? new Date(value) : null
			},
			immediate: true,
		},
	},
	mounted() {
		this.computeSelectorOptionsStyle()
		window.addEventListener('resize', this.computeSelectorOptionsStyle)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.computeSelectorOptionsStyle)
	},
	methods: {
		handleFocus() {
			this.showDatePicker = true
			this.computeSelectorOptionsStyle()
		},
		handleBlur() {
			this.showDatePicker = false
		},
		setDate(value) {
			this.currentDate = value
			this.showDatePicker = false
			this.$emit('input', value)
		},
		computeSelectorOptionsStyle() {
			if (isBrowser) {
				const top =
					this.$refs.input.getBoundingClientRect().top -
					window.document.body.getBoundingClientRect().top +
					this.$refs.input.offsetHeight +
					POPPER_OFFSET
				const left =
					this.$refs.input.getBoundingClientRect().left -
					window.document.body.getBoundingClientRect().left
				this.selectorOptionStyle = `position: absolute; top: ${top}px; left: ${left}px;`
			}
		},
	},
}
</script>
