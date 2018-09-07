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
				/>
				<i class="yoco form-icon" v-text="indicatorRep" />
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
import { mixin as clickaway } from '../../../src/mixin/vue-clickaway'

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
		value: [String, Number],
	},
	data() {
		return {
			queryString: '',
			selectedLabel: '',
			visible: false,
		}
	},
	mounted() {
		if (this.value && this.options) {
			const selectedItem = this.options.find(
				option => option.value === this.value,
			)
			this.selectedLabel = selectedItem.label
			this.setQueryString(selectedItem.label)
		}
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
