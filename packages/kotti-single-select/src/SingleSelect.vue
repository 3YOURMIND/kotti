<template>
	<div class="selects" v-on-clickaway="handleClickOutside" >
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-right">
				<input
					class="form-input"
					v-model="selectedLabel"
					type="text"
					:placeholder="placeholder"
					:readonly="!filterable"
					@input="handleQueryChange"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
				/>
				<i class="yoco form-icon" v-text="indicatorRep" />
				<div v-if="visible" class="form-options">
					<ul>
						<li v-if="isLoading" class="form-option--loading">Loading</li>
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
							>
							No result found
						</li>
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
		label: { type: String, default: null },
		options: { type: Array, default: [] },
		placeholder: { type: String, default: null },
		value: [String, Number],
		isAsync: { type: Boolean, default: false },
		isLoading: { type: Boolean, default: false },
	},
	data() {
		return {
			currentValue: [String, Number],
			filterResults: [],
			queryString: '',
			selectedLabel: '',
			visible: false,
		}
	},
	mounted() {
		if (this.value) {
			this.initialSelect(this.value)
		}
	},
	computed: {
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down'
		},
		optionsRep() {
			return this.filterable ? this.filterResults : this.options
		},
	},
	watch: {
		options(value) {
			this.filterResults = value
		},
	},
	methods: {
		optionClass(option) {
			let _disableClass = false
			if (option.value === null && this.allowEmpty) {
				_disableClass = false
			}
			if (option.value === null && !this.allowEmpty) {
				_disableClass = true
			}
			if (option.disabled) {
				_disableClass = true
			}
			return {
				'form-option--disabled': _disableClass,
			}
		},
		handleOptionClick(option) {
			if (option.value === null && !this.allowEmpty) {
				return
			}
			if (!option.disabled) {
				this.selectedLabel = option.label
				this.setValue(this.selectedLabel)
				this.visible = false
			}
			return
		},
		handleQueryChange(evt) {
			if (!this.filterable) return
			this.queryString = evt.target.value.toLowerCase()
			if (this.isAsync) {
				this.$emit('asyncMethod', this.queryString)
			}
			this.handleQuery(this.queryString)
		},
		handleQuery(query) {
			let results = []
			this.options.filter(item => {
				if (item.value !== null) {
					if (
						item.label.toLowerCase().includes(query) ||
						item.value.toLowerCase().includes(query)
					) {
						results.push(item)
					}
				}
			})
			this.filterResults = results
		},
		handleInputFocus() {
			if (!this.queryString && this.isAsync) {
				this.$emit('asyncMethod', null)
			}

			this.visible = true
		},
		handleClickOutside() {
			if (this.selectedLabel || this.allowEmpty) {
				this.visible = false
			}
		},
		setValue(label) {
			let selectedItem = this.options.find(option => option.label === label)
			this.currentValue = selectedItem.value
			this.$emit('input', this.currentValue)
		},
		initialSelect(value) {
			if (!this.options) return
			let selectedItem = this.options.find(option => option.value === value)
			this.queryString = selectedItem.label
			this.selectedLabel = selectedItem.label
			this.handleQuery(this.queryString)
		},
	},
}
</script>
