<template>
	<div class="selects">
		<div class="form-group">
			<label v-if="hasLabel" :class="formLabelClass" v-text="labelRep" />
			<div :class="{ 'has-icon-left': icon }" class="has-icon-right">
				<input
					ref="input"
					:class="formInputClass"
					v-model="selectedLabel"
					:disabled="disabled"
					:placeholder="placeholder"
					@input="handleInputChange($event.target.value)"
					:required="required"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
					@click.stop="show"
					v-bind="$attrs"
					type="text"
				/>
				<i
					v-if="icon"
					v-text="icon"
					class="yoco form-icon"
					style="pointer-events: none;"
				/>
				<i
					v-text="indicatorRep"
					class="yoco form-icon select-opening"
					style="pointer-events: none;"
				/>
				<Portal>
					<template v-if="visible">
						<div
							:style="selectorOptionStyle"
							v-on-clickaway="handleClickOutside"
							class="kt-select-options"
						>
							<ul>
								<li
									v-if="isLoading"
									v-text="loadingText"
									class="kt-select-option kt-select-option--loading"
								/>
								<li
									v-else
									v-for="(option, index) in optionsRep"
									:key="index"
									:class="['kt-select-option', optionClass(option)]"
									@click="handleOptionClick(option)"
									v-text="option.label"
								/>
								<li
									v-if="!optionsRep.length && !isLoading"
									v-text="noResultsFoundText"
									class="kt-select-option kt-select-option--empty"
								/>
							</ul>
						</div>
					</template>
				</Portal>
			</div>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { Portal } from '../../util/portal'
import { isBrowser } from '../../util'

export default {
	name: 'KtSelect',
	components: { Portal },
	mixins: [clickaway],
	inheritAttrs: false,
	props: {
		allowEmpty: {
			default: false,
			type: Boolean,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		filterable: {
			default: false,
			type: Boolean,
		},
		icon: {
			default: null,
			type: String,
		},
		isAsync: {
			default: false,
			type: Boolean,
		},
		isCompact: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		label: {
			default: null,
			type: String,
		},
		loadingText: {
			default: 'Loading',
			type: String,
		},
		noResultsFoundText: {
			default: 'No Results Found',
			type: String,
		},
		options: {
			default: () => [],
			type: Array,
		},
		placeholder: {
			default: null,
			type: String,
		},
		required: {
			default: false,
			type: Boolean,
		},
		value: {
			default: null,
			type: [String, Number, Boolean, Object, null],
		},
	},
	data() {
		return {
			selectorOptionStyle: '',
			queryString: '',
			selectedLabel: '',
			visible: false,
		}
	},
	computed: {
		formInputClass() {
			return {
				'form-input': true,
				'form-input--compact': this.isCompact,
				'form-input--compact--focus': this.isCompact && this.visible,
			}
		},
		filterResults() {
			if (this.queryString === null) return this.options

			const query = this.queryString.toLowerCase()
			return this.options.filter(({ label, value }) =>
				label !== null
					? label.toLowerCase().includes(query)
					: value !== null
					? value.toLowerCase().includes(query)
					: false,
			)
		},
		formLabelClass() {
			return {
				'form-label': true,
				'form-label--compact': this.isCompact,
				'form-label--compact--focus':
					this.isCompact && (this.visible || this.selectedLabel),
			}
		},
		hasLabel() {
			return this.label && this.label.length
		},
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down'
		},
		invalidInput() {
			return this.required && !this.selectedLabel
		},
		labelRep() {
			return this.required ? `${this.label} *` : this.label
		},
		optionsRep() {
			return this.filterable ? this.filterResults : this.options
		},
	},
	watch: {
		value: {
			immediate: true,
			handler(value) {
				if (value === null && this.allowEmpty) {
					this.selectedLabel = ''
					return
				}
				if (value === null || this.options.length === 0) {
					return
				}
				const selectedItem = this.options.find(option => option.value === value)
				this.selectedLabel = selectedItem.label
			},
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
		computeSelectorOptionsStyle() {
			if (isBrowser) {
				const top =
					this.$refs.input.getBoundingClientRect().top -
					window.document.body.getBoundingClientRect().top +
					this.$refs.input.offsetHeight
				const left =
					this.$refs.input.getBoundingClientRect().left -
					window.document.body.getBoundingClientRect().left
				const width = this.$refs.input.offsetWidth
				this.selectorOptionStyle = `top: ${top}px; left: ${left}px; width: ${width}px;`
			}
		},
		handleClickOutside() {
			if (this.visible && (this.allowEmpty || this.selectedLabel)) {
				this.visible = false
			}
		},
		handleInputChange(value) {
			if (!this.filterable) {
				this.selectedLabel = ''
				return
			}
			this.setQueryString(value)
		},
		handleInputFocus(event) {
			this.$emit('focus', event)
			this.show()
		},
		handleOptionClick(option) {
			if (!this.isOptionAllowed(option)) return

			this.selectedLabel = option.label
			// const selectedItem = this.options.find(
			// 	({ label }) => label === this.selectedLabel,
			// )
			const selectedItem = option //a scenario where this is not the same as above?
			this.$emit('input', selectedItem.value)
			this.setQueryString('')
			this.visible = false
		},
		isOptionAllowed({ disabled, value }) {
			if (disabled) return false
			if (!this.allowEmpty && value === null) return false
			return true
		},
		optionClass(option) {
			if (!this.isOptionAllowed(option)) return 'kt-select-option--disabled'
		},
		setQueryString(value) {
			if (!this.filterable) return
			this.queryString = value
			this.triggerAsync()
		},
		show() {
			if (!this.visible) {
				this.computeSelectorOptionsStyle()
				this.visible = true
				this.triggerAsync()
			}
		},
		triggerAsync() {
			if (!this.isAsync) return

			return this.$emit(
				'asyncMethod',
				this.queryString === null ? null : this.queryString.toLowerCase(),
			)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';
@import '../../kotti-style/mixins/index.scss';

.form-select {
	appearance: none;
	border: $border-width solid $lightgray-400;
	border-radius: $border-radius;
	color: inherit;
	font-size: $font-size;
	height: $control-size;
	line-height: $line-height;
	outline: none;
	padding: $control-padding-y $control-padding-x;
	vertical-align: middle;
	width: 100%;

	&[size],
	&[multiple] {
		height: auto;

		option {
			padding: $unit-h $unit-1;
		}
	}

	&:not([multiple]):not([size]) {
		background: #fff
			url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23667189'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E")
			no-repeat right 0.35rem center/.4rem 0.5rem;
		padding-right: $control-icon-size + $control-padding-x;
	}

	&:focus {
		@include control-shadow();
		border-color: $primary-500;
	}

	&::-ms-expand {
		display: none;
	}

	// Select sizes
	&.select-sm {
		font-size: $font-size-sm;
		height: $control-size-sm;
		padding: $control-padding-y-sm ($control-icon-size + $control-padding-x-sm)
			$control-padding-y-sm $control-padding-x-sm;
	}

	&.select-lg {
		font-size: $font-size-lg;
		height: $control-size-lg;
		padding: $control-padding-y-lg ($control-icon-size + $control-padding-x-lg)
			$control-padding-y-lg $control-padding-x-lg;
	}
}

.selects .form-group {
	.form-icon {
		right: auto;
	}
	.select-opening {
		right: $unit-2;
		left: auto;
		cursor: pointer;
	}
}

.kt-select-options {
	position: absolute;
	margin-top: $unit-1;
	background: #fff;
	box-shadow: $box-shadow;
	border-radius: $border-radius;
	padding: 0.4rem 0;
	z-index: $zindex-4;
	max-height: 20rem;
	overflow: hidden;
	overflow-y: auto;
	ul {
		margin: 0;
	}

	.kt-select-option {
		margin: 0;
		line-height: 1.2rem;
		padding: 0.2rem 0.4rem;
		list-style: none;

		&.kt-select-option--disabled {
			color: $lightgray-500;

			&:hover {
				cursor: not-allowed;
			}
		}

		&.kt-select-option--empty,
		&.kt-select-option--loading {
			text-align: center;
			color: $lightgray-500;

			&:hover {
				cursor: default;
				background: transparent;
			}
		}
	}

	.kt-select-option:hover {
		cursor: pointer;
		background: #f8f8f8;
	}
}
</style>
