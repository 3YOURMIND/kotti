<template>
	<div class="selects">
		<div class="form-group">
			<label :class="formLabelClass" v-text="label" />
			<div class="has-icon-right" :class="{ 'has-icon-left': icon }">
				<input
					:class="formInputClass"
					v-model="selectedLabel"
					type="text"
					:placeholder="placeholder"
					:readonly="!filterable"
					@input="setQueryString($event.target.value)"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
					@click.stop="show"
					v-bind="$attrs"
					ref="input"
				/>
				<i
					v-if="icon"
					class="yoco form-icon"
					v-text="icon"
					style="pointer-events: none;"
				/>
				<i
					class="yoco form-icon select-opening"
					v-text="indicatorRep"
					style="pointer-events: none;"
				/>
				<Portal>
					<template v-if="visible">
						<div
							:style="selectorOptionStyle"
							class="form-options"
							v-on-clickaway="handleClickOutside"
						>
							<ul>
								<li
									v-if="isLoading"
									class="form-option--loading"
									v-text="loadingText"
								/>
								<li
									v-else
									v-for="(option, index) in optionsRep"
									:key="index"
									:class="optionClass(option)"
									@click="handleOptionClick(option)"
									v-text="option.label"
								/>
								<li
									v-if="!optionsRep.length && !isLoading"
									class="form-option--empty"
									v-text="noResultsFoundText"
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
	mixins: [clickaway],
	components: { Portal },
	inheritAttrs: false,
	props: {
		allowEmpty: {
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
			default: [],
			type: Array,
		},
		placeholder: {
			default: null,
			type: String,
		},
		value: {
			default: null,
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
	mounted() {
		this.computeSelectorOptionsStyle()
		window.addEventListener('resize', this.computeSelectorOptionsStyle)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.computeSelectorOptionsStyle)
	},
	computed: {
		formInputClass() {
			return {
				'form-input': true,
				'form-input--compact': this.isCompact,
				'form-input--compact--focus': this.isCompact && this.visible,
			}
		},
		formLabelClass() {
			return {
				'form-label': true,
				'form-label--compact': this.isCompact,
				'form-label--compact--focus':
					this.isCompact && (this.visible || this.selectedLabel),
			}
		},
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down'
		},
		optionsRep() {
			return this.filterable ? this.filterResults : this.options
		},
		filterResults() {
			if (this.queryString === null) return this.options

			const query = this.queryString.toLowerCase()
			return this.options.filter(({ label, value }) => {
				if (value === null) return false

				return (
					label.toLowerCase().includes(query) ||
					value.toLowerCase().includes(query)
				)
			})
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
				this.setQueryString(selectedItem.label)
			},
		},
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
		isOptionAllowed({ disabled, value }) {
			if (disabled) return false
			if (!this.allowEmpty && value === null) return false
			return true
		},
		optionClass(option) {
			if (!this.isOptionAllowed(option)) return 'form-option--disabled'
		},
		handleOptionClick(option) {
			if (!this.isOptionAllowed(option)) return

			this.selectedLabel = option.label

			const selectedItem = this.options.find(
				({ label }) => label === this.selectedLabel,
			)
			this.$emit('input', selectedItem.value)
			this.queryString = this.selectedLabel
			this.visible = false
		},
		setQueryString(value) {
			if (!this.filterable) return
			this.queryString = value
			this.triggerAsync()
		},
		triggerAsync() {
			if (!this.isAsync) return

			return this.$emit(
				'asyncMethod',
				this.queryString === null ? null : this.queryString.toLowerCase(),
			)
		},
		handleInputFocus(event) {
			this.$emit('focus', event)
			this.show()
		},
		show() {
			if (!this.visible) {
				this.visible = true
				this.triggerAsync()
			}
		},
		handleClickOutside() {
			if (this.visible && (this.allowEmpty || this.selectedLabel)) {
				this.visible = false
			}
		},
	},
}
</script>
<style lang="scss">
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
.form-options {
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

	li {
		margin: 0;
		line-height: 1.2rem;
		padding: 0.2rem 0.4rem;
		list-style: none;

		&.form-option--disabled {
			color: $lightgray-500;

			&:hover {
				cursor: not-allowed;
			}
		}

		&.form-option--empty,
		&.form-option--loading {
			text-align: center;
			color: $lightgray-500;

			&:hover {
				cursor: default;
				background: transparent;
			}
		}
	}

	li:hover {
		cursor: pointer;
		background: #f8f8f8;
	}
}
</style>
