<template>
	<div class="selects">
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-right" v-on-clickaway="handleClickOutside">
				<input
					class="form-input"
					v-model="selectedLabel"
					type="text"
					:placeholder="placeholder"
					:readonly="!filterable"
					@input="setQueryString($event.target.value)"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
					ref="input"
				/>
				<i
					class="yoco form-icon"
					v-text="indicatorRep"
					style="pointer-events: none;"
				/>
				<div
					v-show="visible"
					:style="formOptionStyle"
					ref="formOptions"
					class="form-options"
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
			</div>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
	name: 'KtSelect',
	mixins: [clickaway],
	props: {
		allowEmpty: { type: Boolean, default: false },
		filterable: { type: Boolean, default: false },
		isAsync: { type: Boolean, default: false },
		isLoading: { type: Boolean, default: false },
		label: { type: String, default: null },
		loadingText: { type: String, default: 'Loading' },
		noResultsFoundText: { type: String, default: 'No Results Found' },
		options: { type: Array, default: [] },
		placeholder: { type: String, default: null },
		value: { default: null },
	},
	data() {
		return {
			queryString: '',
			selectedLabel: '',
			visible: false,
			formOptions: null,
			formOptionsContainer: null,
			input: null,
			formOptionStyle: '',
		}
	},
	mounted() {
		this.formOptions = this.$refs['formOptions']
		this.input = this.$refs['input']
		this.formOptionsContainer = document.querySelector('body')
		this.formOptionsContainer.append(this.formOptions)
		this.computeFormOptionsStyle()
		window.addEventListener('resize', this.computeFormOptionsStyle)
	},
	beforeDestroy() {
		this.formOptionsContainer.removeChild(this.formOptions)
		window.removeEventListener('resize', this.computeFormOptionsStyle)
	},
	computed: {
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
		computeFormOptionsStyle() {
			let top =
				this.input.getBoundingClientRect().top -
				this.formOptionsContainer.getBoundingClientRect().top +
				this.input.offsetHeight
			let left =
				this.input.getBoundingClientRect().left -
				this.formOptionsContainer.getBoundingClientRect().left
			let width = this.input.offsetWidth
			this.formOptionStyle = `top: ${top}px; left: ${left}px; width: ${width}px;`
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
		handleInputFocus() {
			this.visible = true
			this.triggerAsync()
		},
		handleClickOutside() {
			if (this.allowEmpty || this.selectedLabel) this.visible = false
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

.form-options {
	position: absolute;
	top: 2rem;
	left: 0;
	right: 0;
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
