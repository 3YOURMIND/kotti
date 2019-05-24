<template>
	<div class="selects">
		<div class="form-group">
			<label :class="formLabelClass" v-text="label" />
			<div class="has-icon-right" v-on-clickaway="handleClickOutside">
				<input
					:class="formInputClass"
					v-model="selectedLabel"
					type="text"
					:placeholder="placeholder"
					:readonly="!filterable"
					@input="setQueryString($event.target.value)"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
				/>
				<i
					class="yoco form-icon"
					v-text="indicatorRep"
					style="pointer-events: none;"
				/>
				<div v-if="visible" class="form-options">
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
		isCompact: { default: false, type: Boolean },
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
